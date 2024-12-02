# FastAPI/app/utils/helpers.py

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
