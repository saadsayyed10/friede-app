from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import AIMessage, HumanMessage

from models.LLM import LLM
from templates.allery_template import allergyTemplate
from lib.extract_json import extractJson

def collectAllergyInformationService(patientId: str):
    # A list to store informations of all chat threads in a loop
    chatHistory = []

    # Prompt to include the chat history
    prompt = ChatPromptTemplate.from_messages([
        ("system", allergyTemplate),
        ("human", "{question}")
    ])

    # Chain to create pipeline of prompt with the LLM
    chain = prompt | LLM

    # Run the loop
    while True:
        # Question from user as input
        question = input("\nAsk your question: (Press 'q' to exit)\n")
        if question.lower() in ["exit", "quit"]: # Quit converstion if user types exit or quit
            break

        # Execution
        res = chain.invoke({
            "patientId": patientId,
            "question": question,
            "chatHistory": chatHistory
        })

        content = res.content[0]["text"]

        print("\nFriede:\n")
        print(content)

        # Append the turn to chat history so the model remembers it next time
        chatHistory.append(HumanMessage(content=question))   
        chatHistory.append(AIMessage(content=content))

        # Check if content contains valid JSON; if so, break the loop
        summaryData = extractJson()
        if summaryData is not None:
            print("\n[JSON summary received. Ending session.]")
            break