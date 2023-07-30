CREATE TABLE if NOT EXISTS anime (
    anime_id INTEGER,
    url TEXT,
    image_jpg TEXT,
    image_jpg_small TEXT,
    image_jpg_large TEXT,
    image_webp TEXT,
    image_webp_small TEXT,
    image_webp_large TEXT,
    approved INTEGER,
    type TEXT,
    source TEXT,
    episodes INTEGER,
    status TEXT,
    airing INTEGER,
    aired_from TEXT,
    aired_to TEXT,
    duration TEXT,
    rating TEXT,
    score TEXT,
    scored_by INTEGER,
    rank INTEGER,
    popularity INTEGER,
    season TEXT,
    year INTEGER
);

CREATE TABLE if NOT EXISTS producer (
    producer_id INTEGER,
    type TEXT,
    name TEXT,
    url TEXT
);

CREATE TABLE if NOT EXISTS licensor (
    licensor_id INTEGER,
    type TEXT,
    name TEXT,
    url TEXT
);

CREATE TABLE if NOT EXISTS studio (
    studio_id INTEGER,
    type TEXT,
    name TEXT,
    url TEXT
);

CREATE TABLE if NOT EXISTS genre (
    genre_id INTEGER,
    type TEXT,
    name TEXT,
    url TEXT
);

CREATE TABLE if NOT EXISTS theme (
    theme_id INTEGER,
    type TEXT,
    name TEXT,
    url TEXT
);

CREATE TABLE if NOT EXISTS demographic (
    demographic_id INTEGER,
    type TEXT,
    name TEXT,
    url TEXT
);

CREATE TABLE if NOT EXISTS character (
    character_id INTEGER,
    url TEXT,
    name TEXT,
    image_jpg TEXT,
    image_webp TEXT,
    image_webp_small TEXT
);

CREATE TABLE if NOT EXISTS voiceactor (
    voiceactor_id INTEGER,
    url TEXT,
    image_url TEXT,
    name TEXT,
    website_url TEXT,
    given_name TEXT,
    family_name TEXT,
    birthday string,
    favorites INTEGER,
    about string
);

CREATE TABLE if NOT EXISTS staff (
    staff_id INTEGER,
    url TEXT,
    image_url TEXT,
    name TEXT
);

CREATE TABLE if NOT EXISTS anime_producer (
    anime_id INTEGER,
    producer_id INTEGER
);

CREATE TABLE if NOT EXISTS anime_licensor (
    anime_id INTEGER,
    licensor_id INTEGER
);

CREATE TABLE if NOT EXISTS anime_studio (
    anime_id INTEGER,
    studio_id INTEGER
);

CREATE TABLE if NOT EXISTS anime_genre (
    anime_id INTEGER,
    genre_id INTEGER
);

CREATE TABLE if NOT EXISTS anime_theme (
    anime_id INTEGER,
    theme_id INTEGER
);

CREATE TABLE if NOT EXISTS anime_demographic (
    anime_id INTEGER,
    demographic_id INTEGER
);

CREATE TABLE if NOT EXISTS anime_title (
    anime_id INTEGER,
    title TEXT,
    type TEXT
);

CREATE TABLE if NOT EXISTS anime_character (
    anime_id INTEGER,
    character_id INTEGER,
    role TEXT,
    favorites INTEGER
);

CREATE TABLE if NOT EXISTS character_voiceactor (
    character_id INTEGER,
    voiceactor_id INTEGER
);

CREATE TABLE if NOT EXISTS anime_staff (
    anime_id INTEGER,
    staff_id INTEGER,
    position TEXT
);

CREATE TABLE if NOT EXISTS opening_ending_raw(
    anime_id INTEGER,
    name TEXT,
    type TEXT
);