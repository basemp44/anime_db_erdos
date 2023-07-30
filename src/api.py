import aiohttp
import asyncio
import time

from toolz import get_in


async def request_api_get(api_route, params=dict()):
    async with aiohttp.ClientSession() as session:
        async with session.get(f'https://api.jikan.moe/v4/{api_route}', params=params) as response:
            return await response.json()

async def request_api_animes(params):
    return await request_api_get('anime', params=params)


async def request_api_characters(anime_id):
    return await request_api_get(f'anime/{anime_id}/characters')


async def request_api_staff(anime_id):
    return await request_api_get(f'anime/{anime_id}/staff')


async def request_api_openingending(anime_id):
    return await request_api_get(f'anime/{anime_id}/themes')


async def request_api_people(people_id):
    return await request_api_get(f'people/{people_id}')


async def request_without_pagination(name, fn_request, queue_request, ids):
    for id in ids:
        started_at = time.monotonic()
        response = fn_request(id)
        queue_request.put_nowait(dict(id=id, response=response))
        await asyncio.sleep(1)
        request_time = time.monotonic() - started_at
        print(f'request: {name}: {id}: {request_time}')


async def request_characters(queue_request, ids):
    return await request_without_pagination(
        'characters', request_api_characters, queue_request, ids
    )


async def request_staff(queue_request, ids):
    return await request_without_pagination(
        'staff', request_api_staff, queue_request, ids
    )


async def request_openingending(queue_request, ids):
    return await request_without_pagination(
        'themes', request_api_openingending, queue_request, ids
    )


async def request_people(queue_request, ids):
    return await request_without_pagination(
        'people', request_api_people, queue_request, ids
    )


async def request_animes(anime_queue, page=1, iters=0):
    first_response = await request_api_animes(1)
    await asyncio.sleep(1)
    last_visible_page = iters or get_in(['pagination', 'last_visible_page'], first_response)

    for _ in range(last_visible_page-page+1):
        started_at = time.monotonic()
        response = request_api_animes(page)
        anime_queue.put_nowait(dict(id=page, response=response))
        page = page + 1
        await asyncio.sleep(1)
        request_time = time.monotonic() - started_at
        print(f'anime: request: {page-1}: {request_time}')