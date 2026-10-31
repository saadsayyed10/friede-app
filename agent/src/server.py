from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from services.allergy_service import collectAllergyInformationService
from vector import savePatientAllergyInformationInVectorDB, wipePatientAllergyInformationFromVectorDB
from type_class.allergy_types import ChatRequest

app = FastAPI()
router = APIRouter()

origins = [
    "http://localhost:5173",      
    "https://friede-app.vercel.app/",   
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           
    allow_credentials=True,          
    allow_methods=["*"],             
    allow_headers=["*"],             
)

@router.post("/api/ai/allergy")
async def collectAllergyInformationController(data: ChatRequest):
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

@router.delete("/api/ai/allergy/{patientId}")
async def wipeAllergyInformationController(patientId: str):
    result = wipePatientAllergyInformationFromVectorDB(patientId)

    return {
        "success": True,
        "message": result
    }


app.include_router(router)