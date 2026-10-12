import { Button } from "@/components/ui/button";
import Navbar from "./Unverified/Navbar";
import {
  Badge,
  BotMessageSquare,
  Calendar,
  Clock,
  LogIn,
  Pill,
  UserKey,
} from "lucide-react";

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-start items-center w-full min-h-screen bg-white lg:py-10 lg:px-20 flex-col lg:gap-y-10">
        {/* Hero Section */}
        <div className="flex justify-center items-center w-full">
          <div className="flex justify-start items-start flex-col w-[50%] lg:gap-y-6">
            <Button
              variant={"secondary"}
              className={
                "rounded-full bg-green-100 text-green-700 hover:bg-green-100"
              }
            >
              <Badge fill="green" /> AI Medication Companion
            </Button>

            <h2 className="text-6xl font-semibold text-neutral-800">
              Understand your
              <br />
              medicines with
              <br />
              <span className="text-green-700">confidence.</span>
            </h2>

            <h6 className="w-[88%] text-lg text-neutral-600">
              Friede helps patient understand prescribed medications, manage
              complex schedules and resolve everyday medication related doubts
              with personalized, clinically aligned AI support.
            </h6>

            <div className="flex justify-start items-start w-full lg:gap-x-6">
              <Button
                className={
                  "bg-green-700 text-green-100 hover:bg-green-800 lg:py-6"
                }
                size={"lg"}
              >
                <UserKey color="white" /> Get Started
              </Button>

              <Button
                variant={"secondary"}
                className={
                  "bg-green-100 text-green-700 hover:bg-green-100 lg:py-6"
                }
                size={"lg"}
              >
                <LogIn color="green" /> Already have an account?
              </Button>
            </div>
          </div>

          <div className="flex justify-end items-end flex-col w-[50%] lg:gap-y-6">
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
                      "Hello Saad Sayyed,
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
      </div>
    </>
  );
};

export default Landing;
