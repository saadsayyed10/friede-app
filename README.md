# About **Friede**

**Friede** is an AI-powered native web application which helps patients to understand, diagnose and solve doubts in one go. Patients **uploads** the **image prescription** given by doctor, labeled on medicine or type manually then ask personal **AI chatbot** agent about whatever the related question they have with the medicine they are taking. **AI chatbot** doesn’t replace the whole doctor though it resolves doubts of the patient by answering to their mundane questions.

# What problem does **Friede** solve?

**Friede** helps patients by studying them and answering to their simple mundane questions just by surveying them during account creation, analyzing their uploaded medical prescriptions and communication with patients to diagnose the condition of the patient.

# **Features of Friede**

1. **Authentication:** Patients need an account to store their data, this is handled by a simple email and password based authentication, where users sign up and their account get’s created in one go. If they forget password, resetting is easier with the protected mailing system.
2. **Dashboard:** Patients need a dashboard to track their activities. They can see their data in a graph, their active meds, meds that are about to expire, recent chats, their meds history, route to scan and route to chat.
3. **Scanning Medical Prescription:** An **OCR** feature which scans the medical prescription from the medicine label or the doctor’s hand written prescription and store in a valid format in **VectorDB** with patient’s **ID** so that it can get easy to retrieve data.
4. **AI Chatbot Agent:** An AI chatbot which is trained on patient’s scanned prescription. This AI Chatbot answers all the doubts and issues of the patients which are related to uploaded medicines only. This chatbot doesn’t know about other things except that has been uploaded.
5. **History:** This is the chat log which is not editable i.e read-only. User can only read the previous chat to remember forgotten asked questions.
6. **Profile:** This is the profile that stores information of the patient, options to edit or delete the account or change password.

# High Level Architecture

![HLD](__documentations__/image.png)
