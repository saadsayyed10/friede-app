import json
from langchain_chroma import Chroma
from langchain_core.documents import Document

from models.Embeddings import embeddings

# Location in root as dir chroma_db will store all vector data
dbLocation = "./chroma_db"

# Initialize a var to store vectors
vectorStore = Chroma(
    collection_name="patientAllergies",
    embedding_function=embeddings,
    persist_directory=dbLocation
)

# Function to save patient's allergy JSON summary into the vector DB
def savePatientAllergyInformationInVectorDB(summaryData: dict):
    # Extract patient ID
    patientId = summaryData.get("patientId")

    # If patient ID is not available, throw error
    if not patientId:
        print("Error: No patientId found in summary data.")
        return

    # Convert the JSON/dictionary data into a searchable text string to allow semantic searching
    pageContent = f"""
    PatientID: {patientId}
    Allergy Summary: {json.dumps(summaryData.get('allergies', []), indent = 2)}
    """

    # Create the LangChain Document
    doc = Document(
        page_content=pageContent.strip(),
        metadata = {
            "patientId": patientId
        }
    )

    # Add to Chroma DB as patient ID being the unique key
    vectorStore.add_documents(
        documents=[doc],
        ids=[patientId]
    )
    print(f"Successfully saved records for {patientId} to vector DB!")