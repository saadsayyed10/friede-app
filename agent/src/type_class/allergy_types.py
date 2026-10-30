from pydantic import BaseModel
from typing import List, Dict

class ChatRequest(BaseModel):
    question: str
    patientId: str
    chatHistory: List[Dict[str, str]] = []