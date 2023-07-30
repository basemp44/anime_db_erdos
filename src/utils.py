import pandas as pd

from toolz import merge_with

def join_dict_dfs(dict_a, dict_b):
    return merge_with(pd.concat, dict_a, dict_b)
