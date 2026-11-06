import Navbar from "../Unverified/Navbar";
import { Bot, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useChatHistory } from "@/hooks/useChatHistory";
import { toast } from "@/components/ui/toast";
import {
  allergyInformationExtractionAIAgentAPI,
  updateAllergyInformationAPI,
} from "@/api/allergy.api";
import { useSignUp } from "@/hooks/useSignUp";
import { Spinner } from "@/components/ui/spinner";
import { useAllergy } from "@/hooks/useAllergy";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getToken } from "@clerk/react";

interface ChatMessage {
  role: "human" | "ai";
  content: string;
}

const TypewriterAIResponse = ({ content }: { content: string }) => {
  const [displayedText, setDisplayedText] = useState<string>("");

  useEffect(() => {
    if (!content || content === "undefined") {
      setDisplayedText("");
      return;
    }

    const words = content.split(" ");
    let currentWords: string[] = [];
    let currentIndex = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        const word = words[currentIndex];

        if (word && word !== "undefined") {
          currentWords.push(word);
          setDisplayedText(currentWords.join(" "));
        }
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [content]);

  return <h6 className="text-sm lg:text-base">{displayedText}</h6>;
};

const UpdateAllergy = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { setChatHistory, reset: resetChatHistory } = useChatHistory();
  const chatHistory = useChatHistory((state) => state.chatHistory);
  const { userId: patientId, profilePictureUrl } = useSignUp();
  const { setAllergies, reset: resetAllergy } = useAllergy();
  const allergies = useAllergy((state) => state.allergies);

  const [question, setQuestion] = useState<string>("");
  const [dataMimic, setDataMimic] = useState<ChatMessage[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [allergyUpdateLoading, setAllergyUpdateLoading] =
    useState<boolean>(false);
  const [openAllergyDialog, setOpenAllergyDialog] = useState<boolean>(false);
  const [reviewFlag, setReviewFlag] = useState<boolean>(false);

  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [dataMimic, loading]);

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
          setChatHistory(res.data.chatHistory);

          // Safely check that response exists and isn't the literal string "undefined"
          const rawResponse = res.data.response;
          const safeResponse =
            rawResponse && rawResponse !== "undefined" ? rawResponse : "";

          const newAIMessage: ChatMessage = {
            role: "ai",
            content: safeResponse,
          };
          setDataMimic((prev) => [...prev, newAIMessage]);

          if (res.data.isCompleted === true) {
            resetAllergy();
            setAllergies(res.data.summaryData.allergies);

            setReviewFlag(true);
            setOpenAllergyDialog(true);
          }
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

  const handleUpdateAllergy = async () => {
    setAllergyUpdateLoading(true);
    try {
      const token = await getToken();

      await updateAllergyInformationAPI(allergies, token!)
        .then((res) => {
          toast.add({
            title: "Allergy summary updated",
            description:
              "Friede updated data based on the revised allergen information.",
          });

          console.log(res.data.message);
          resetChatHistory();
          navigate("/friede");
        })
        .catch((err) =>
          toast.add({
            title: "Friede failed to update",
            description: err?.response?.data?.error,
          }),
        );
    } catch (error: any) {
      toast.add({
        title: "Friede is not available right now",
        description: error.message,
      });
    } finally {
      setAllergyUpdateLoading(false);
    }
  };

  useEffect(() => {
    console.log("Chat history content: " + chatHistory.length);
  }, [chatHistory]);

  return (
    <>
      <Navbar />

      <div className="flex justify-start items-start w-full lg:h-min min-h-screen flex-col gap-y-10 mb-28 lg:px-16 px-6 py-4 lg:py-20">
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

          {dataMimic.map((chats, idx) => {
            const isLatestAiMessage =
              chats.role === "ai" && idx === dataMimic.length - 1;

            const isJsonPayload = chats.content.trim().startsWith("{");
            const displayContent = isJsonPayload
              ? "Thanks for sharing your allergies with Friede. Please review your allergens."
              : chats.content;

            return (
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
                      {isLatestAiMessage ? (
                        <TypewriterAIResponse content={displayContent} />
                      ) : (
                        <h6 className="text-sm lg:text-base">
                          {displayContent}
                        </h6>
                      )}
                    </div>
                    {chats.role === "human" && (
                      <img
                        src={profilePictureUrl!}
                        alt={profilePictureUrl!}
                        className="w-10 h-10 rounded-[100%]"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
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
            {reviewFlag ? (
              <Button
                size={"lg"}
                className={"bg-green-700 hover:bg-green-800 mb-0.5"}
                onClick={() => setOpenAllergyDialog(true)}
              >
                Review
              </Button>
            ) : (
              <Button
                size={"lg"}
                className={"bg-green-700 hover:bg-green-800 mb-0.5"}
                onClick={handleSendQuestion}
                disabled={loading}
              >
                {loading ? <Spinner /> : <SendHorizonal color="white" />}
              </Button>
            )}
          </div>
        </div>
      </footer>

      <AlertDialog open={openAllergyDialog} onOpenChange={setOpenAllergyDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Allergy Summary</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently erase the previous allergic
              information from the Friede memory.
              <br />
              <br />{" "}
              <span className="font-medium text-neutral-800">
                Please review new allergen information below:
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          {allergies?.map((data, idx) => (
            <div
              key={idx}
              className="shadow rounded-xl bg-neutral-50 flex justify-start items-start flex-col gap-y-2 w-full px-4 py-2"
            >
              <div className="flex justify-between items-center w-full">
                <h6 className="font-semibold text-lg">
                  {data.allergy} Allergen
                </h6>
                <span
                  className={`${data.risk === "High" && "bg-red-200 text-red-700"} ${data.risk === "Moderate" && "bg-yellow-200 text-yellow-700"} ${data.risk === "Low" && "bg-green-200 text-green-700"} px-2 py-1 text-xs rounded-full font-semibold lg:block hidden`}
                >
                  {data.risk} Risk
                </span>
              </div>
              <h6 className="lg:text-sm text-neutral-600">{data.cause}</h6>
              <span
                className={`${data.risk === "High" && "bg-red-200 text-red-700"} ${data.risk === "Moderate" && "bg-yellow-200 text-yellow-700"} ${data.risk === "Low" && "bg-green-200 text-green-700"} px-2 py-1 text-xs rounded-full font-semibold block lg:hidden`}
              >
                {data.risk} Risk
              </span>
            </div>
          ))}

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdateAllergy}>
              {allergyUpdateLoading ? <Spinner /> : "Update"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UpdateAllergy;
