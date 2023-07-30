import asyncio

from functools import reduce
from toolz import (
    assoc,
    get_in
)

from .utils import join_dict_dfs
from .format import (
    format_anime,
    format_character,
    format_staff,
    format_openingending
)
from .api import (
    request_api_animes,
    request_api_characters,
    request_api_staff,
    request_api_openingending
)
from .db import get_ids_new_or_not_finished


async def worker_process_anime(response, queue_request, queue_final, mode, request_params, db='animedb.sqlite'):
    mode_type = mode.get('type')
    dict_dfs_anime = format_anime(response)
    await queue_final.put(dict_dfs_anime)
    response_ids = dict_dfs_anime['df_anime']['anime_id'].values

    if mode_type == 'full_recreate':
        anime_ids = sorted(response_ids)
    else:
        anime_ids = get_ids_new_or_not_finished(response_ids, db=db)

    for anime_id in anime_ids:
        await queue_request.put(['character',     anime_id, request_api_characters(anime_id)])
        await queue_request.put(['staff',         anime_id, request_api_staff(anime_id)])
        await queue_request.put(['openingending', anime_id, request_api_openingending(anime_id)])
    
    if mode_type == 'scores' and (mode.get('min_score') > dict_dfs_anime['df_anime']['anime_id'].iloc[-1]):
        has_next_page = False
    elif mode_type == 'test':
        has_next_page = False
    else:
        has_next_page = get_in(['pagination', 'has_next_page'], response)

    if has_next_page:
        page = 1 + get_in(['pagination', 'current_page'], response)
        await queue_request.put(['anime', page, request_api_animes(assoc(request_params, 'page', page))])

    return has_next_page


async def worker_process_character(id, response, queue_final):
    dict_dfs_character = format_character(id, response)
    await queue_final.put(dict_dfs_character)


async def worker_process_staff(id, response, queue_final):
    dict_dfs_staff = format_staff(id, response)
    await queue_final.put(dict_dfs_staff)


async def worker_process_openingending(id, response, queue_final):
    dict_dfs_openingending = format_openingending(id, response)
    await queue_final.put(dict_dfs_openingending)


async def worker_request(queues, logger, sleep=1):
    queue_request, queue_process = queues
    while True:
        try:
            if not queue_request.empty():
                wtype, id, async_request = await queue_request.get()
                logger.info(f'worker_request: {wtype}: {id}')
                response = await async_request
                await queue_process.put([wtype, id, response])
        except Exception as e:
            logger.error('worker_request')
            logger.error(e)
        finally:
            await asyncio.sleep(sleep)


async def worker_process(queues, params, logger, sleep=1):
    queue_request, queue_process, queue_final = queues
    mode           = params.get('mode', dict())
    request_params = params.get('request_params', dict())
    db             = params.get('db', 'animedb.sqlite')

    has_next_page = True
    finish = 0
    exceptions = 0

    while True:
        try:
            if not queue_process.empty():
                wtype, id, response = await queue_process.get()
                logger.info(f'worker_process: {wtype}: {id}')
                if wtype == 'anime':
                    has_next_page = await worker_process_anime(response, queue_request, queue_final, mode, request_params, db)
                elif wtype == 'character':
                    await worker_process_character(id, response, queue_final)
                elif wtype == 'staff':
                    await worker_process_staff(id, response, queue_final)
                elif wtype == 'openingending':
                    await worker_process_openingending(id, response, queue_final)
            else:
                await asyncio.sleep(sleep)
        except Exception as e:
            logger.error('worker_process')
            logger.error(e)
            exceptions = exceptions + 1
        finally:
            if not has_next_page and queue_request.empty() and queue_process.empty():
                logger.info(f'finish: {finish}')
                finish = finish + 1
                await asyncio.sleep(sleep)
            if (finish > 2) or (exceptions > 20):
                logger.info(f'finish: {finish}')
                return


async def worker_join(queue_final, logger, sleep=5):
    while True:
        try:
            qsize = queue_final.qsize()
            if qsize > 1:
                logger.info(f'worker_join: joining {qsize} items')
                l = []
                for _ in range(qsize):
                    l.append(await queue_final.get())
                await queue_final.put(reduce(join_dict_dfs, l, dict()))
                for _ in range(qsize):
                    queue_final.task_done()
                logger.info(f'worker_join: joined {qsize} items')
            else:
                logger.info(f'worker_join: no items to join')
        except Exception as e:
            logger.error('worker_join')
            logger.error(e)
        finally:
            await asyncio.sleep(sleep)

