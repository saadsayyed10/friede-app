from services.allergy_service import collectAllergyInformationService
from vector import savePatientAllergyInformationInVectorDB

chatHistory = []

question = input("\nAsk me something:\n")

allergyData = collectAllergyInformationService(question, "patient123", chatHistory)
if allergyData is not None:
    savePatientAllergyInformationInVectorDB(allergyData)
else:
    print("Session ended without generating a JSON summary.")