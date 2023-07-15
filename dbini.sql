CREATE TABLE anime (
    anime_id INTEGER PRIMARY KEY,
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

CREATE TABLE producer (
    producer_id INTEGER PRIMARY KEY,
    type TEXT,
    name TEXT,
    url TEXT
);

CREATE TABLE licensor (
    licensor_id INTEGER PRIMARY KEY,
    type TEXT,
    name TEXT,
    url TEXT
);

CREATE TABLE studio (
    studio_id INTEGER PRIMARY KEY,
    type TEXT,
    name TEXT,
    url TEXT
);

CREATE TABLE genre (
    genre_id INTEGER PRIMARY KEY,
    type TEXT,
    name TEXT,
    url TEXT
);

CREATE TABLE theme (
    theme_id INTEGER PRIMARY KEY,
    type TEXT,
    name TEXT,
    url TEXT
);

CREATE TABLE demographic (
    demographic_id INTEGER PRIMARY KEY,
    type TEXT,
    name TEXT,
    url TEXT
);

CREATE TABLE anime_producer (
    anime_id INTEGER,
    producer_id INTEGER,
    FOREIGN KEY(anime_id) REFERENCES anime(anime_id),
    FOREIGN KEY(producer_id) REFERENCES producer(producer_id)
);

CREATE TABLE anime_licensor (
    anime_id INTEGER,
    licensor_id INTEGER,
    FOREIGN KEY(anime_id) REFERENCES anime(anime_id),
    FOREIGN KEY(licensor_id) REFERENCES licensor(licensor_id)
);

CREATE TABLE anime_studio (
    anime_id INTEGER,
    studio_id INTEGER,
    FOREIGN KEY(anime_id) REFERENCES anime(anime_id),
    FOREIGN KEY(studio_id) REFERENCES studio(studio_id)
);

CREATE TABLE anime_genre (
    anime_id INTEGER,
    genre_id INTEGER,
    FOREIGN KEY(anime_id) REFERENCES anime(anime_id),
    FOREIGN KEY(genre_id) REFERENCES genre(genre_id)
);

CREATE TABLE anime_theme (
    anime_id INTEGER,
    theme_id INTEGER,
    FOREIGN KEY(anime_id) REFERENCES anime(anime_id),
    FOREIGN KEY(theme_id) REFERENCES theme(theme_id)
);

CREATE TABLE anime_demographic (
    anime_id INTEGER,
    demographic_id INTEGER,
    FOREIGN KEY(anime_id) REFERENCES anime(anime_id),
    FOREIGN KEY(demographic_id) REFERENCES demographic(demographic_id)
);

CREATE TABLE anime_title (
    anime_id INTEGER,
    title TEXT,
    type TEXT,
    FOREIGN KEY(anime_id) REFERENCES anime(anime_id)
);