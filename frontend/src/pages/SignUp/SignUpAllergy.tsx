import Navbar from "../Unverified/Navbar";
import { Bot, Check, MilkOff, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useAllergy } from "@/hooks/useAllergy";
import { toast } from "@/components/ui/toast";
import { allergyInformationExtractionAIAgentAPI } from "@/api/allergy.api";
import { useSignUp } from "@/hooks/useSignUp";
import { Spinner } from "@/components/ui/spinner";

interface ChatMessage {
  role: "human" | "ai";
  content: string;
}

const SignUpAllergy = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { setChatHistory, reset } = useAllergy();
  const chatHistory = useAllergy((state) => state.chatHistory);
  const { userId: patientId } = useSignUp();

  const [question, setQuestion] = useState<string>("");
  const [dataMimic, setDataMimic] = useState<ChatMessage[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  };

  const handleSendQuestion = async () => {
    if (!question.trim()) {
      toast.add({
        title: "No question asked",
        description:
          "In order to continue with the converstion, please ask a question",
      });

      return;
    }

    const currentQuestion = question;
    setLoading(true);

    const newHumanMessage: ChatMessage = {
      role: "human",
      content: currentQuestion,
    };
    setDataMimic((prev) => [...prev, newHumanMessage]);
    try {
      await allergyInformationExtractionAIAgentAPI(
        question,
        patientId!,
        chatHistory,
      )
        .then((res) => {
          console.log("Human: " + question);
          console.log("AI: " + res.data.response);
          console.log(res.data);

          setChatHistory(res.data.chatHistory);

          const newAIMessage: ChatMessage = {
            role: "ai",
            content: res.data.response,
          };
          setDataMimic((prev) => [...prev, newAIMessage]);
        })
        .catch((err) => {
          toast.add({
            title: "Failed to chat with Friede",
            description: err?.response?.data?.error,
          });
        });
    } catch (error: any) {
      toast.add({
        title: "Friede is not available right now",
        description: error.message,
      });
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  useEffect(() => {
    console.log("Chat history content: " + chatHistory.length);
  }, [chatHistory]);

  useEffect(() => {
    reset();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex justify-start items-start w-full lg:h-min min-h-screen flex-col gap-y-10 mb-20 lg:px-16 px-6 py-4 lg:py-20">
        <div className="flex justify-center items-center w-full gap-x-2 lg:mb-14 mb-10 mt-4">
          <div className="flex justify-center items-center flex-col gap-y-2">
            <div className="flex justify-center items-center w-10 h-10 rounded-[100%] bg-green-700">
              <Check color="white" />
            </div>

            <h6 className="text-xs text-green-700 font-medium">Your Profile</h6>
          </div>

          <div className="bg-neutral-200 h-1 w-50 rounded-xl" />

          <div className="flex justify-center items-center flex-col gap-y-2">
            <div className="flex justify-center items-center w-10 h-10 rounded-[100%] bg-green-700">
              <MilkOff color="white" />
            </div>

            <h6 className="text-xs text-neutral-400 font-medium">Allergies</h6>
          </div>

          <div className="bg-neutral-200 h-1 w-50 rounded-xl" />

          <div className="flex justify-center items-center flex-col gap-y-2">
            <div className="flex justify-center items-center w-10 h-10 rounded-[100%] bg-green-700">
              <h5 className="text-neutral-200 text-xl font-semibold">3</h5>
            </div>

            <h6 className="text-xs text-neutral-400 font-medium">Review</h6>
          </div>
        </div>

        <div className="flex justify-center items-center w-full flex-col gap-y-8">
          <div className="flex justify-start items-start w-full">
            <div className="flex justify-start items-start w-full gap-x-4">
              <Bot color="green" size={20} />
              <div className="flex justify-start items-start lg:max-w-120 max-w-56 p-4 bg-neutral-100 shadow rounded-xl">
                <h6 className="text-sm lg:text-base">
                  Let&apos;s talk about your allergies. Do you have any known
                  allergies to medicines, foods or orther substances? You can
                  share as much details as you know.
                </h6>
              </div>
            </div>
          </div>

          {dataMimic.map((chats, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center w-full flex-col gap-y-8"
            >
              <div
                className={`flex ${chats.role === "ai" ? "justify-start items-start" : "justify-end items-start"} w-full`}
              >
                <div
                  className={`flex ${chats.role === "ai" ? "justify-start items-start" : "justify-end items-start"} w-full gap-x-4`}
                >
                  {chats.role === "ai" && <Bot color="green" size={20} />}
                  <div
                    className={`flex ${chats.role === "ai" ? "justify-start" : "justify-end"} items-start lg:max-w-120 max-w-56 ${chats.role === "ai" ? "p-4" : "px-4 py-6"} ${chats.role === "ai" ? "bg-neutral-100" : "bg-green-100"} shadow rounded-xl`}
                  >
                    <h6 className="text-sm lg:text-base">{chats.content}</h6>
                  </div>
                  {chats.role === "human" && (
                    <div className="w-10 h-10 bg-green-700 rounded-[100%]" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="flex justify-center items-center w-full fixed bottom-4 px-4">
        <div className="flex justify-center items-center w-full max-w-2xl bg-white shadow-md rounded-2xl p-3 lg:px-4 lg:py-4">
          <div className="flex justify-between items-end w-full gap-3">
            <textarea
              ref={textareaRef}
              onInput={handleInput}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={1}
              className="w-full resize-none overflow-y-auto max-h-37.5 lg:py-2 py-1 px-3 bg-green-100/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 text-sm lg:text-base"
              placeholder="Type your allergy details or corrections (e.g., 'Also sensitive to Suifa')..."
            />
            <Button
              size={"lg"}
              className={"bg-green-700 hover:bg-green-800 mb-0.5"}
              onClick={handleSendQuestion}
              disabled={loading}
            >
              {loading ? <Spinner /> : <SendHorizonal color="white" />}
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default SignUpAllergy;
