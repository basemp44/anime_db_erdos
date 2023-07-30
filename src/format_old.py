import pandas as pd


def format_anime_base(anime):
    return pd.DataFrame([
        dict(
            anime_id = anime['mal_id'],
            url = anime['url'],
            image_jpg = anime['images'].get('jpg', dict()).get('image_url'),
            image_jpg_small = anime['images'].get('jpg', dict()).get('small_image_url'),
            image_jpg_large = anime['images'].get('jpg', dict()).get('large_image_url'),
            image_webp = anime['images'].get('webp', dict()).get('image_url'),
            image_webp_small = anime['images'].get('webp', dict()).get('small_image_url'),
            image_webp_large = anime['images'].get('webp', dict()).get('large_image_url'),
            approved = anime['approved'],
            type = anime['type'],
            source = anime['source'],
            episodes = anime['episodes'],
            status = anime['status'],
            airing = anime['airing'],
            aired_from = anime['aired'].get('from'),
            aired_to = anime['aired'].get('to'),
            duration = anime['duration'],
            rating = anime['rating'],
            score = anime['score'],
            scored_by = anime['scored_by'],
            rank = anime['rank'],
            popularity = anime['popularity'],
            season = anime['season'],
            year = anime['year']
        )
    ])


def format_X(anime, key):
    return pd\
        .DataFrame(anime[f'{key}s'])\
        .rename(dict(mal_id=f'{key}_id'), axis=1)


def format_anime_X(anime, key):
    return pd\
        .concat([
            pd.DataFrame(columns=['mal_id', 'type', 'name', 'url']),
            pd.DataFrame(anime[f'{key}s'])\
        ])\
        .assign(anime_id = anime['mal_id'])\
        [['anime_id', f'mal_id']]\
        .rename(dict(mal_id=f'{key}_id'), axis=1)


def format_anime_title(anime):
    return pd\
        .DataFrame(anime['titles'])\
        .assign(anime_id = anime['mal_id'])\
        [['anime_id', 'title', 'type']]


def format_anime(anime,i):
    if not i % 100:
        print(i)

    return dict(
        df_anime             = format_anime_base(anime),
        df_producer          = format_X(anime, 'producer'),
        df_licensor          = format_X(anime, 'licensor'),
        df_studio            = format_X(anime, 'studio'),
        df_genre             = format_X(anime, 'genre'),
        df_theme             = format_X(anime, 'theme'),
        df_demographic       = format_X(anime, 'demographic'),
        df_anime_producer    = format_anime_X(anime, 'producer'),
        df_anime_licensor    = format_anime_X(anime, 'licensor'),
        df_anime_studio      = format_anime_X(anime, 'studio'),
        df_anime_genre       = format_anime_X(anime, 'genre'),
        df_anime_theme       = format_anime_X(anime, 'theme'),
        df_anime_demographic = format_anime_X(anime, 'demographic'),
        df_anime_title       = format_anime_title(anime)
    )


def format_character(characters):
    return pd\
        .concat([
            pd.json_normalize(c.get('character', dict()), sep='_')
            for characters_anime in characters
            for c in characters_anime[1].get('data', [])
        ]).drop_duplicates(subset='mal_id')\
        .rename(dict(mal_id='character_id'), axis=1)


def format_character_voiceactors(characters):
    df_character_voiceactors = pd.concat([
        pd.json_normalize(va, sep='_').assign(character_id=character.get('character', dict()).get('mal_id'))
        for characters_anime in characters
        for character in characters_anime[1].get('data', [])
        for va in character.get('voice_actors')
    ]).drop_duplicates()

    df_character_voiceactors = df_character_voiceactors\
        [df_character_voiceactors['language'] == 'Japanese']\
        .rename(dict(
            person_mal_id='voiceactor_id',
            person_url='url',
            person_images_jpg_image_url='image_url',
            person_name='name'
        ), axis=1)

    df_voiceactors = df_character_voiceactors\
        [[
            'voiceactor_id',
            'url',
            'image_url',
            'name',
        ]]\
        .drop_duplicates(subset=['voiceactor_id'])

    df_character_voiceactors = df_character_voiceactors[[
        'character_id',
        'voiceactor_id',
    ]]

    return dict(
        df_voiceactors = df_voiceactors,
        df_character_voiceactors = df_character_voiceactors
    )


def format_anime_character(characters):
    return pd\
        .concat([
            pd.json_normalize(c, sep='_').assign(anime_id=characters_anime[0])
            for characters_anime in characters
            for c in characters_anime[1].get('data', [])
        ])[['anime_id', 'character_mal_id', 'role', 'favorites']]\
        .rename(dict(character_mal_id = 'character_id'), axis=1)


def format_anime(anime,i):
    if not i % 100:
        print(i)

    return dict(
        df_anime             = format_anime_base(anime),
        df_producer          = format_X(anime, 'producer'),
        df_licensor          = format_X(anime, 'licensor'),
        df_studio            = format_X(anime, 'studio'),
        df_genre             = format_X(anime, 'genre'),
        df_theme             = format_X(anime, 'theme'),
        df_demographic       = format_X(anime, 'demographic'),
        df_anime_producer    = format_anime_X(anime, 'producer'),
        df_anime_licensor    = format_anime_X(anime, 'licensor'),
        df_anime_studio      = format_anime_X(anime, 'studio'),
        df_anime_genre       = format_anime_X(anime, 'genre'),
        df_anime_theme       = format_anime_X(anime, 'theme'),
        df_anime_demographic = format_anime_X(anime, 'demographic'),
        df_anime_title       = format_anime_title(anime)
    )

def format_all_characters(characters):
    return dict(
        df_character = format_character(characters),
        **format_character_voiceactors(characters),
        df_anime_character = format_anime_character(characters)
    )


def format_all_staff(staffs):
    df_staff_full = pd.DataFrame(
        [
            dict(
                anime_id  = staff[0],
                staff_id  = s.get('person', dict()).get('mal_id'),
                url       = s.get('person', dict()).get('url'),
                image_url = s.get('person', dict()).get('images', dict()).get('jpg', dict()).get('image_url'),
                name      = s.get('person', dict()).get('name'),
                position  = position
            )
            for staff in staffs
            for s in (staff[1] or dict()).get('data', [])
            for position in s.get('positions', [])
        ],
        columns = [
            'anime_id',
            'staff_id',
            'url',
            'image_url',
            'name',
            'position',
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
