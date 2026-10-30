from pydantic import BaseModel

class ChatRequest(BaseModel):
    question: str
    patientId: str
    chatHistory: list[dict[str, str]] = []