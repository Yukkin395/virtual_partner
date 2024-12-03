# FastAPI/app/utils/helpers.py

import logging
import time
from functools import wraps
import asyncio

def replace_none_in_lengths(data):
    """
    データ内の特定のキーにおいて、Noneをデフォルト値（0.0）に置き換える関数。
    """
    if isinstance(data, dict):
        for k, v in data.items():
            if k in ['consonant_length', 'vowel_length', 'pitch'] and v is None:
                data[k] = 0.0
            elif isinstance(v, (dict, list)):
                replace_none_in_lengths(v)
        return data
    elif isinstance(data, list):
        for item in data:
            replace_none_in_lengths(item)
        return data
    else:
        return data



# ロガーの設定
logger = logging.getLogger("backend_logger")
logger.setLevel(logging.INFO)

# コンソールハンドラーの作成
ch = logging.StreamHandler()
ch.setLevel(logging.INFO)

# フォーマッターの設定
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)

# ハンドラーをロガーに追加
logger.addHandler(ch)

def timeit(func):
    @wraps(func)
    async def async_wrapper(*args, **kwargs):
        start_time = time.time()
        result = await func(*args, **kwargs)
        end_time = time.time()
        elapsed_time = end_time - start_time
        logger.info(f"Function {func.__name__} executed in {elapsed_time:.4f} seconds")
        return result

    @wraps(func)
    def sync_wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        elapsed_time = end_time - start_time
        logger.info(f"Function {func.__name__} executed in {elapsed_time:.4f} seconds")
        return result

    if asyncio.iscoroutinefunction(func):
        return async_wrapper
    else:
        return sync_wrapper