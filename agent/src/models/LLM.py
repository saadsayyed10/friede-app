from dotenv import load_dotenv

load_dotenv()

from langchain_google_genai import ChatGoogleGenerativeAI

LLM = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
)