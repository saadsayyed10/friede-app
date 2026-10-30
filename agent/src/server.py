from fastapi import FastAPI, APIRouter

from services.allergy_service import collectAllergyInformationService
from vector import savePatientAllergyInformationInVectorDB
from type_class.allergy_types import ChatRequest

app = FastAPI()
router = APIRouter()

@router.post("/api/ai/allergy")
def collectAllergyInformationController(data: ChatRequest):
    result = collectAllergyInformationService(
        question = data.question,
        patientId = data.patientId,
        chatHistory = data.chatHistory,
    )

    if result["isCompleted"] and result["summaryData"]:
        savePatientAllergyInformationInVectorDB(result["summaryData"])

    return {
        "response": result["response"],
        "isCompleted": result["isCompleted"],
        "summaryData": result["summaryData"],
        "chatHistory": result["chatHistory"]
    }

app.include_router(router)