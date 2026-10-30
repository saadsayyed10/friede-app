from services.allergy_service import collectAllergyInformationService
from vector import savePatientAllergyInformationInVectorDB

allergyData = collectAllergyInformationService("patient123")
if allergyData is not None:
    savePatientAllergyInformationInVectorDB(allergyData)
else:
    print("Session ended without generating a JSON summary.")