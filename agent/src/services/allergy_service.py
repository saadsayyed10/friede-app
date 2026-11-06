from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import AIMessage, HumanMessage

from models.LLM import LLM
from templates.allery_template import allergyTemplate
from lib.extract_json import extractJson

def collectAllergyInformationService(question: str, patientId: str, chatHistory: list):
    formattedHistory = []

    for turn in chatHistory:
        if turn["role"] == "human":
            formattedHistory.append(HumanMessage(content=turn["content"]))
        else:
            formattedHistory.append(AIMessage(content=turn["content"]))
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", allergyTemplate),
        MessagesPlaceholder(variable_name="chatHistory"),
        ("human", "{question}")
    ])

    chain = prompt | LLM

    res = chain.invoke({
        "patientId": patientId,
        "question": question,
        "chatHistory": chatHistory
    })

    content = res.content[0]["text"]

    print("\nFriede:\n")
    print(content)

        
    summaryData = extractJson(content)
    isCompleted = summaryData is not None

    updatedHistory = chatHistory + [
        {"role": "human", "content": question},
        {"role": "ai", "content": content}
    ]

    return {
        "response": content,
        "isCompleted": isCompleted,
        "summaryData": summaryData,
        "chatHistory": updatedHistory
    }
