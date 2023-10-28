import pandas as pd
import sqlite3 as sq


def execute_fetchall(query, commit=False, db='animedb.sqlite'):
    conn = sq.connect(db)
    cursor = conn.cursor()
    result = cursor.execute(query).fetchall()
    cursor.close()
    if commit:
        conn.commit()
    
    conn.close()

    return result


def get_schema(table, db='animedb.sqlite'):
    return execute_fetchall(
        f"SELECT sql FROM sqlite_master WHERE type='table' and name='{table}';",
        db = db
    )[0][0]


def get_schemas(db='animedb.sqlite'):
    return execute_fetchall(
        f"SELECT sql FROM sqlite_master WHERE type='table';",
        db = db
    )


def drop_table(table, db='animedb.sqlite'):
    return execute_fetchall(
        f'DROP TABLE {table}',
        commit = True,
        db = db
    )


def get_tables(db='animedb.sqlite'):
    conn = sq.connect(db)
    cursor = conn.cursor()
    tables = [t[0] for t in cursor.execute(f"SELECT name FROM sqlite_master WHERE type='table';").fetchall()]
    cursor.close()
    conn.close()

    return tables


def count_tables(tables, db='animedb.sqlite'):
    conn = sq.connect(db)
    df = pd.concat([
        pd.read_sql(f"select count(*) as {table} from {table}", conn)
        for table in tables
    ], axis=1)
    conn.close()
    return df.T


def get_table(table, db='animedb.sqlite', columns=[]):
    conn = sq.connect(db)
    if len(columns):
        df = pd.read_sql(f'select {", ".join(columns)} from {table}', conn)
    else:
        df = pd.read_sql(f'select * from {table}', conn)
    conn.close()
    return df


def get_table_filter_ids(table, key_id, ids, db='animedb.sqlite'):
    conn = sq.connect(db)
    ids_str = ', '.join(ids)
    df = pd.read_sql(
        f'select * from {table} where {key_id} in ({ids_str})',
        conn
    )
    conn.close()
    return df


def get_ids_new_or_not_finished(ids, db='animedb.sqlite'):
    conn = sq.connect(db)
    ids_str = ', '.join([str(id) for id in ids])
    df = pd.read_sql(
        f'select anime_id from anime where anime_id in ({ids_str}) and status = "Finished Airing"',
        conn
    )
    conn.close()
    return set(ids) - set(df['anime_id'])


def update_db(df, table, duplicate_cols, recreate=True, db='animedb.sqlite'):
    with sq.connect(db) as conn:
        df_orig = pd.read_sql(f"select * from {table}", conn)

        if recreate:
            df = pd\
                .concat([df,df_orig])\
                .drop_duplicates(subset=duplicate_cols)
        else:
            df = df[~df[duplicate_cols].isin(df_orig[duplicate_cols])]
    
    if recreate:
        schema = get_schema(table, db)

        drop_table(table, db)
        execute_fetchall(schema, commit = True, db = db)

    with sq.connect(db) as conn:
        df.to_sql(table, conn, if_exists='append', index=False)
        conn.commit()