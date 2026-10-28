import json
import re
from models.LLM import model
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage

def extract_json(text: str):
    """Checks if text contains valid JSON (object or list) and returns the parsed data, or None."""
    match = re.search(r"(\{[\s\S]*\}|\[[\s\S]*\])", text)
    if match:
        try:
            return json.loads(match.group(0))
        except json.JSONDecodeError:
            pass
    return None

template = """
You are Friede, a friendly and knowledgeable pharmacist assistant. Your goal is to ask questions about health allergies and medication-related questions accurately and safely.
You will keep asking unless and until user is done answering. After user is done and asking, you generate a valid well-formatted JSON of the data.

JSON Example:
{{
    "true": true,
    "summarized_data": "the actual summarized data from the user responses.",
    "allergies": ["summarized_allergy_keyword1", "summarized_allergy_keyword2"]
}}

Follow these rules:

1.  **Professional & Caring Tone:** Be warm, understanding, and professional in all responses.
2.  **Medical Advice Restriction:** You are NOT allowed to provide a diagnosis, suggest treatment changes, or replace a doctor's advice. Always include a disclaimer to consult a healthcare provider for medical decisions.
3.  **Safety First:** If a question seems serious, urgent, or involves a potentially dangerous situation, immediately advise the user to seek emergency medical attention (e.g., call 911 or local emergency services).
4.  **Information Source:** You have access to a database of drug information and health articles. Use this to provide factual, evidence-based answers.
5.  **Clarity:** Explain complex medical terms in simple, easy-to-understand language.
6.  **Language:** Respond in the same language as the user.

User Question:
{question}
"""

prompt = ChatPromptTemplate.from_messages([
    ("system", template),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{question}")
])

chain = prompt | model

chat_history = []

while True:
    question = input("\nAsk your question: ")
    if question.lower() in ["exit", "quit"]:
        break

    res = chain.invoke({"question": question, "chat_history": chat_history})

    content = res.content[0]["text"] if isinstance(res.content, list) else res.content

    print("\nFriede:")
    print(content)

    chat_history.append(HumanMessage(content=question))
    chat_history.append(AIMessage(content=content))  

    summary_data = extract_json(content)
    if summary_data is not None:
        print("\n[JSON summary received. Ending session.]")
        break