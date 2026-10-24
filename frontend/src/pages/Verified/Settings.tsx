import {
  CloudCheck,
  Database,
  LockOpen,
  ScrollText,
  Trash,
  User,
  UserRoundMinus,
} from "lucide-react";
import Navbar from "./Navbar";
import { useSignUp } from "@/hooks/useSignUp";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "../Unverified/Footer";

const Settings = () => {
  const { name, email, profilePictureUrl, userId } = useSignUp();

  return (
    <>
      <Navbar />

      <div className="flex justify-start items-start w-full lg:h-min min-h-screen flex-col gap-y-10 lg:px-16 p-6 lg:py-20">
        <div className="flex justify-start items-start w-full flex-col lg:gap-y-2 gap-y-1">
          <span className="text-xs text-green-700 font-semibold uppercase">
            Clinical Repository · Patient Portal
          </span>

          <h2 className="lg:text-4xl text-3xl font-semibold text-neutral-800 text-left">
            Account settings
          </h2>

          <h6 className="lg:w-full lg:text-base text-sm text-neutral-600 text-left">
            Manage your profile, verified allergies and clinical data
            preferences.
          </h6>
        </div>

        <div className="flex justify-start items-start w-full lg:mt-0 mt-6">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-green-700">
              <User size={23} />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xl font-semibold tracking-tight text-neutral-900">
                Basic Information
              </h4>
              <p className="mt-1 text-sm text-neutral-500">
                Primary legal name and authenticating credentials
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-start items-start w-full lg:mt-6">
          <div className="flex lg:flex-row flex-col items-start lg:gap-6 gap-4">
            <img
              src={profilePictureUrl!}
              alt={profilePictureUrl!}
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[100%]"
            />

            <div className="flex justify-start items-start flex-col gap-y-4">
              <div className="min-w-0 flex-1">
                <Label className="text-xs tracking-wide text-neutral-500 uppercase">
                  Patient ID
                </Label>
                <Input
                  value={userId!}
                  disabled
                  className="w-full mt-2 truncate"
                />
              </div>

              <div className="min-w-0 flex-1">
                <Label className="text-xs tracking-wide text-neutral-500 uppercase">
                  Legal full name
                </Label>
                <Input value={name!} disabled className="w-full mt-2" />
              </div>

              <div className="min-w-0 flex-1">
                <Label className="text-xs tracking-wide text-neutral-500 uppercase">
                  Email address
                </Label>
                <Input value={email!} disabled className="w-full mt-2" />
              </div>
            </div>

            {/* TODO: Allergies summary here */}
          </div>
        </div>

        <div className="flex justify-start items-start w-full mt-6">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-green-700">
              <Database size={23} />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xl font-semibold tracking-tight text-neutral-900">
                Account Information & Usage
              </h4>
              <p className="mt-1 text-sm text-neutral-500">
                Cryptographic storage allocation and repository metrics
              </p>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto overscroll-x-contain pb-3 lg:overflow-visible">
          <div className="flex w-max min-w-full items-stretch gap-4 lg:w-full lg:gap-10">
            {/* Uploaded prescriptions */}
            <div className="flex h-46 w-65 shrink-0 flex-col items-start justify-start gap-y-2 rounded-xl bg-neutral-100 p-4 shadow lg:w-full">
              <div className="flex w-full items-center justify-between text-neutral-500">
                <span className="w-full text-xs font-semibold uppercase">
                  Uploaded prescriptions
                </span>
                <ScrollText size={23} className="shrink-0" />
              </div>

              <h4 className="text-xl font-semibold tracking-tight text-neutral-900 lg:text-4xl">
                0
              </h4>

              <span className="w-full text-xs font-semibold text-neutral-500">
                prescriptions in repository
              </span>
            </div>

            {/* Allocated storage */}
            <div className="flex h-46 w-65 shrink-0 flex-col items-start justify-start gap-y-2 rounded-xl bg-neutral-100 p-4 shadow lg:w-full">
              <div className="flex w-full items-center justify-between text-neutral-500">
                <span className="w-full text-xs font-semibold uppercase">
                  Allocated storage
                </span>
                <LockOpen size={23} className="shrink-0" />
              </div>

              <h4 className="text-xl font-semibold tracking-tight text-neutral-900 lg:text-4xl">
                50 MB
              </h4>

              <span className="w-full text-xs font-semibold text-neutral-500">
                encrypted patient vault
              </span>
            </div>

            {/* Remaining storage */}
            <div className="flex h-46 w-65 shrink-0 flex-col items-start justify-start gap-y-2 rounded-xl bg-neutral-100 p-4 shadow lg:w-full">
              <div className="flex w-full items-center justify-between text-neutral-500">
                <span className="w-full text-xs font-semibold uppercase">
                  Remaining storage
                </span>
                <CloudCheck size={23} className="shrink-0" />
              </div>

              <h4 className="text-xl font-semibold tracking-tight text-neutral-900 lg:text-2xl">
                50 MB
              </h4>

              <div className="mt-1 h-2 w-full rounded-full bg-neutral-200">
                <div className="h-full w-full rounded-full bg-green-700" />
              </div>

              <span className="w-full text-xs font-semibold text-green-700">
                100% available
              </span>

              <span className="mt-auto w-full text-xs font-semibold text-neutral-400 lg:mt-5">
                0 KB consumed of 50 MB
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-start items-start lg:w-[60%] w-full mt-6 lg:p-6 p-4 bg-neutral-100 shadow rounded-xl">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-200 text-red-700">
              <Trash size={23} />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xl font-semibold tracking-tight text-neutral-900">
                Delete account
              </h4>

              <div className="flex justify-start items-start w-full lg:flex-row flex-col gap-y-4 lg:gap-x-6">
                <p className="mt-1 text-sm text-neutral-500 lg:w-[60%]">
                  Permanently remove your Friede account. This action is
                  destructive and cannot be undone.
                </p>

                <Button
                  className={
                    "bg-red-600 hover:bg-red-700 text-neutral-200 hover:text-neutral-300 lg:mt-0 mt-6"
                  }
                >
                  <UserRoundMinus size={23} /> Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Settings;
