import { Button } from "@/components/ui/button";
import Navbar from "./Unverified/Navbar";
import {
  Activity,
  Badge,
  BotMessageSquare,
  Calendar,
  CalendarDays,
  Clock,
  LogIn,
  MessageSquare,
  Pill,
  UserKey,
} from "lucide-react";
import Footer from "./Unverified/Footer";
import { useSignIn } from "@clerk/react/legacy";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";

const Landing = () => {
  const { signIn } = useSignIn();
  const [loading, setLoading] = useState(false);

  const handleAuthentication = async () => {
    if (!signIn) return;
    setLoading(true);
    try {
      await signIn
        .authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/authorization",
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          toast.add({
            title: "Google Sign In failed",
            description: err,
          });
        });
    } catch (error: any) {
      setLoading(false);
      toast.add({
        title: "Google Sign In failed",
        description: error.message,
      });
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-start items-center w-full min-h-screen bg-white py-10 lg:px-20 px-6 flex-col gap-y-10 mb-20">
        {/* Hero Section */}
        <div className="flex justify-center items-center w-full lg:flex-row flex-col">
          <div className="flex lg:justify-start justify-center lg:items-start items-center flex-col lg:w-[50%] w-full gap-y-6">
            <Button
              variant={"secondary"}
              className={
                "rounded-full bg-green-100 text-green-700 hover:bg-green-100"
              }
            >
              <Badge fill="green" /> AI Medication Companion
            </Button>

            <h2 className="lg:text-6xl text-5xl font-semibold text-neutral-800 text-center lg:text-left">
              Understand your
              <br />
              medicines with
              <br />
              <span className="text-green-700">confidence.</span>
            </h2>

            <h6 className="lg:w-[88%] text-lg text-neutral-600 text-center lg:text-left">
              Friede helps patient understand prescribed medications, manage
              complex schedules and resolve everyday medication related doubts
              with personalized, clinically aligned AI support.
            </h6>

            <div className="flex lg:justify-start justify-center lg:items-start items-center w-full lg:flex-row flex-col gap-y-4 lg:gap-x-6">
              <Button
                onClick={handleAuthentication}
                className={
                  "bg-green-700 text-green-100 hover:bg-green-800 py-6 lg:w-min w-full"
                }
                size={"lg"}
                disabled={loading}
              >
                {loading ? <Spinner /> : <UserKey color="white" />} Get Started
              </Button>

              <Button
                onClick={handleAuthentication}
                variant={"secondary"}
                className={
                  "bg-green-100 text-green-700 hover:bg-green-100 py-6 lg:w-min w-full"
                }
                size={"lg"}
                disabled={loading}
              >
                {loading ? <Spinner /> : <LogIn color="green" />} Already have
                an account?
              </Button>
            </div>
          </div>

          <div className="flex lg:justify-end justify-center lg:items-end items-center flex-col lg:w-[50%] w-full gap-y-6 lg:mt-0 mt-10">
            <div className="w-full rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md sm:p-6">
              <div className="flex flex-col gap-5">
                {/* Medication header */}
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <Pill size={23} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
                      Metformin HCL
                    </h4>
                    <p className="mt-1 text-sm text-neutral-500">Medication</p>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Scheduled
                  </span>
                </div>

                {/* Dosage */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-lg bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-700">
                    <Pill size={16} className="text-neutral-500" />
                    500 mg
                  </span>

                  <span className="rounded-lg bg-neutral-100 px-3 py-2 text-sm text-neutral-600">
                    2 doses daily
                  </span>
                </div>

                {/* Schedule */}
                <div className="flex items-start gap-3 rounded-xl bg-green-50/80 p-3.5">
                  <Clock size={18} className="mt-0.5 shrink-0 text-green-700" />

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-neutral-800">
                      Daily schedule
                    </p>
                    <p className="mt-1 text-sm leading-5 text-neutral-600">
                      Take 1 in the morning and 1 in the evening.
                    </p>
                  </div>

                  <Calendar
                    size={18}
                    className="mt-0.5 shrink-0 text-neutral-400"
                  />
                </div>
              </div>
            </div>

            <div className="w-full rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md sm:p-6">
              <div className="flex flex-col gap-5">
                {/* AI Agent header */}
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-200 text-neutral-800">
                    <BotMessageSquare size={23} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
                      Friede Clinical Assistant
                    </h4>
                    <p className="mt-1 text-sm text-neutral-500">Just now</p>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Active
                  </span>
                </div>

                {/* Message */}
                <div className="flex items-start gap-3 rounded-xl bg-green-50/80 p-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-neutral-800">
                      "
                      <span className="mt-1 text-sm leading-5 text-neutral-600">
                        Hello
                      </span>{" "}
                      Saad Sayyed,
                    </p>
                    <p className="mt-1 text-sm leading-5 text-neutral-600">
                      Your Metformin HCL is best taken with a glass of water,
                      consistently at the same time each morning. No known food
                      interactions detected with your current profile."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center w-full flex-col gap-y-6 lg:mt-16 mt-10">
          <Button
            variant={"secondary"}
            className={"bg-white text-green-700 hover:bg-white font-semibold"}
          >
            THOUGHTFULLY DESIGNED CARE
          </Button>

          <h2 className="lg:text-6xl text-5xl font-semibold text-neutral-800 text-center">
            Precision clarity for complex care
            <br /> routines
          </h2>

          <h6 className="lg:w-[60%] text-lg text-neutral-600 text-center">
            Everything you need to navigate multiple prescriptions safely,
            intuitively and without confusion.
          </h6>

          <div className="flex justify-center items-center lg:flex-row flex-col w-full lg:gap-x-8 gap-y-8">
            <div className="w-full rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md sm:p-6">
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <Activity size={23} />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
                      Understand medical <br />
                      information
                    </h4>
                  </div>
                </div>

                <div className="flex flex-wrap items-center">
                  <p className="mt-1 text-sm text-neutral-500">
                    Demystify complex medical teminology. Obtain plain language
                    summaries detailing medication purpose, contradictions and
                    everyday dietary guidelines.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md sm:p-6">
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <CalendarDays size={23} />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
                      Keep personal information organized
                    </h4>
                  </div>
                </div>

                <div className="flex flex-wrap items-center">
                  <p className="mt-1 text-sm text-neutral-500">
                    Centralize your entire medical history, caregiver notes,
                    refill alerts and daily adherence records securely within an
                    encrypted single pane.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md sm:p-6">
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <MessageSquare size={23} />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
                      Get help with everyday medical questions
                    </h4>
                  </div>
                </div>

                <div className="flex flex-wrap items-center">
                  <p className="mt-1 text-sm text-neutral-500">
                    Unsure whether to take your tablet? Ask Friede anytime. My
                    clinical dialog model provides calibrated guidance backed by
                    rigorous protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Landing;
