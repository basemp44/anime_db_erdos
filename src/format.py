import pandas as pd

from toolz import get_in


def format_anime(response):
    def format_anime_r(response):
        return pd.DataFrame(
            [
                dict(
                    anime_id = get_in(['mal_id'], anime),
                    url = get_in(['url'], anime),
                    image_jpg = get_in(['images', 'jpg', 'image_url'], anime),
                    image_jpg_small = get_in(['images', 'jpg', 'small_image_url'], anime),
                    image_jpg_large = get_in(['images', 'jpg', 'large_image_url'], anime),
                    image_webp = get_in(['images', 'webp', 'image_url'], anime),
                    image_webp_small = get_in(['images', 'webp', 'small_image_url'], anime),
                    image_webp_large = get_in(['images', 'webp', 'large_image_url'], anime),
                    approved = get_in(['approved'], anime),
                    type = get_in(['type'], anime),
                    source = get_in(['source'], anime),
                    episodes = get_in(['episodes'], anime),
                    status = get_in(['status'], anime),
                    airing = get_in(['airing'], anime),
                    aired_from = get_in(['aired', 'from'], anime),
                    aired_to = get_in(['aired', 'to'], anime),
                    duration = get_in(['duration'], anime),
                    rating = get_in(['rating'], anime),
                    score = get_in(['score'], anime),
                    scored_by = get_in(['scored_by'], anime),
                    rank = get_in(['rank'], anime),
                    popularity = get_in(['popularity'], anime),
                    season = get_in(['season'], anime),
                    year = get_in(['year'], anime),
                )
                for anime in [] or response.get('data', [])
            ],
            columns = [
                'anime_id',
                'url',
                'image_jpg',
                'image_jpg_small',
                'image_jpg_large',
                'image_webp',
                'image_webp_small',
                'image_webp_large',
                'approved',
                'type',
                'source',
                'episodes',
                'status',
                'airing',
                'aired_from',
                'aired_to',
                'duration',
                'rating',
                'score',
                'scored_by',
                'rank',
                'popularity',
                'season',
                'year'
            ]
        )


    def format_anime_r_X(response, key, with_rel = True, extra_cols=[]):
        df = pd.DataFrame([
                dict(anime_id=anime.get('mal_id'), **x)
                for anime in [] or response.get('data', [])
                for x in anime.get(f'{key}s', [])
            ]).rename(dict(mal_id=f'{key}_id'), axis=1)
        
        if with_rel:
            if df.empty:
                return [df, df]
            else:
                return [
                    df[['anime_id', f'{key}_id'] + extra_cols],
                    df.drop('anime_id', axis=1).drop_duplicates()
                ]
        else:
            return df


    df_anime = format_anime_r(response)
    df_anime_producer   , df_producer    = format_anime_r_X(response, 'producer')
    df_anime_licensor   , df_licensor    = format_anime_r_X(response, 'licensor')
    df_anime_studio     , df_studio      = format_anime_r_X(response, 'studio')
    df_anime_genre      , df_genre       = format_anime_r_X(response, 'genre')
    df_anime_theme      , df_theme       = format_anime_r_X(response, 'theme')
    df_anime_demographic, df_demographic = format_anime_r_X(response, 'demographic')
    df_title = format_anime_r_X(response, 'title', with_rel = False, extra_cols=['type'])

    return dict(
        df_anime             = df_anime,
        df_producer          = df_producer,
        df_anime_producer    = df_anime_producer,
        df_licensor          = df_licensor,
        df_anime_licensor    = df_anime_licensor,
        df_studio            = df_studio,
        df_anime_studio      = df_anime_studio,
        df_genre             = df_genre,
        df_anime_genre       = df_anime_genre,
        df_theme             = df_theme,
        df_anime_theme       = df_anime_theme,
        df_demographic       = df_demographic,
        df_anime_demographic = df_anime_demographic,
        df_title             = df_title
    )


def format_character(id, response):
    df_characters_all = pd.DataFrame(
        [
            dict(
                anime_id = id,
                character_id = get_in(['character', 'mal_id'], character),
                character_url = get_in(['character', 'url'], character),
                character_name = get_in(['character', 'name'], character),
                character_image_jpg = get_in(['character', 'images', 'jpg', 'image_url'], character),
                character_image_webp = get_in(['character', 'images', 'webp', 'image_url'], character),
                character_image_webp_small = get_in(['character', 'images', 'webp', 'small_image_url'], character),
                role = get_in(['role'], character),
                favorites = get_in(['favorites'], character),
                voiceactor_id = get_in(['person', 'mal_id'], va),
                voiceactor_url = get_in(['person', 'url'], va),
                voiceactor_image_url = get_in(['person', 'images', 'jpg', 'image_url'], va),
                voiceactor_name = get_in(['person', 'name'], va),
                language = get_in(['language'], va),
            )
            for character in response.get('data', [])
            for va in character.get('voice_actors', [])
        ],
        columns = [
            'anime_id',
            'character_id',
            'character_url',
            'character_name',
            'character_image_jpg',
            'character_image_webp',
            'character_image_webp_small',
            'role',
            'favorites',
            'voiceactor_id',
            'voiceactor_url',
            'voiceactor_image_url',
            'voiceactor_name',
            'language',
        ]
    )

    df_character = df_characters_all\
        [[
            'character_id',
            'character_url',
            'character_name',
            'character_image_jpg',
            'character_image_webp',
            'character_image_webp_small',
        ]]\
        .rename(columns = lambda x: x[len('character_'):])\
        .rename(columns = dict(id = 'character_id'))\
        .drop_duplicates()

    df_voiceactor = df_characters_all\
        [df_characters_all['language'] == 'Japanese']\
        [[
            'voiceactor_id',
            'voiceactor_url',
            'voiceactor_image_url',
            'voiceactor_name',
        ]]\
        .rename(columns = lambda x: x[len('voiceactor_'):])\
        .rename(columns = dict(id = 'voiceactor_id'))\
        .drop_duplicates()

    df_anime_character = df_characters_all\
        [[
            'anime_id',
            'character_id',
            'role',
            'favorites'
        ]]\
        .drop_duplicates()

    df_character_voiceactor = df_characters_all\
        [df_characters_all['language'] == 'Japanese']\
        [[
            'character_id',
            'voiceactor_id',
        ]]\
        .drop_duplicates() 

    return dict(
        df_character = df_character,
        df_voiceactor = df_voiceactor,
        df_character_voiceactor = df_character_voiceactor,
        df_anime_character = df_anime_character
    )


def format_staff(id, response):
    df_staff_full = pd.DataFrame(
        [
            dict(
                anime_id  = id,
                staff_id  = staff.get('person', dict()).get('mal_id'),
                url       = staff.get('person', dict()).get('url'),
                image_url = staff.get('person', dict()).get('images', dict()).get('jpg', dict()).get('image_url'),
                name      = staff.get('person', dict()).get('name'),
                position  = position
            )
            for staff in [] or response.get('data', [])
            for position in staff.get('positions', [])
        ],
        columns = [
            'anime_id',
            'staff_id',
            'url',
            'image_url',
            'name',
            'position'
        ]
    )

    df_staff = df_staff_full\
        .sort_values('image_url')\
        .drop_duplicates(subset='staff_id', keep='last')\
        [['staff_id', 'url', 'image_url', 'name']]\
        .sort_values('staff_id')\
        .reset_index(drop=True)
    
    df_anime_staff = df_staff_full\
        [[
            'anime_id',
            'staff_id',
            'position'
        ]]\
        .drop_duplicates()\
        .sort_values(['anime_id', 'staff_id'])
    
    return dict(
        df_staff = df_staff,
        df_anime_staff = df_anime_staff
    )


def format_openingending(id, response):
    df_opening_ending = pd.DataFrame(
        [
            [id, oe, st]
            for oe in ['openings', 'endings']
            for st in get_in(['data', oe], response)
        ],
        columns = ['anime_id', 'name', 'type']
    )

    return dict(
        df_opening_ending = df_opening_ending
    )

