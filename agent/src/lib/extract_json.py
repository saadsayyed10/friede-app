import json
import re

def extractJson(text: str):
    match = re.search(r"(\{[\s\S]*\}|\[[\s\S]*\])", text)

    if match:
        try:
            return json.loads(match.group(0))
        except json.JSONDecodeError:
            pass

    return None
