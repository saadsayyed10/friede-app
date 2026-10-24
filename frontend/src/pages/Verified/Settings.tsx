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

const Settings = () => {
  const { name, email, profilePictureUrl, userId } = useSignUp();

  return (
    <>
      <Navbar />

      <div className="flex justify-start items-start w-full lg:h-min min-h-screen flex-col gap-y-10 lg:px-16 px-6 py-4 lg:py-20">
        <div className="flex justify-start items-start w-full flex-col lg:gap-y-2">
          <span className="text-xs text-green-700 font-semibold uppercase">
            Clinical Repository · Patient Portal
          </span>

          <h2 className="lg:text-4xl text-3xl font-semibold text-neutral-800 text-center lg:text-left">
            Account settings
          </h2>

          <h6 className="lg:w-full lg:text-base text-sm text-neutral-600 text-center lg:text-left">
            Manage your profile, verified allergies and clinical data
            preferences.
          </h6>
        </div>

        <div className="flex justify-start items-start w-full">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-green-700">
              <User size={23} />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
                Basic Information
              </h4>
              <p className="mt-1 text-sm text-neutral-500">
                Primary legal name and authenticating credentials
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-start items-start w-full lg:mt-6">
          <div className="flex items-start lg:gap-6">
            <img
              src={profilePictureUrl!}
              alt={profilePictureUrl!}
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[100%]"
            />

            <div className="flex justify-start items-start flex-col lg:gap-y-4">
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

        <div className="flex justify-start items-start w-full lg:mt-6">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-green-700">
              <Database size={23} />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
                Account Information & Usage
              </h4>
              <p className="mt-1 text-sm text-neutral-500">
                Cryptographic storage allocation and repository metrics
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center w-full lg:gap-10">
          <div className="flex justify-start items-start flex-col lg:gap-y-2 bg-neutral-100 p-4 w-full h-46 shadow rounded-xl">
            <div className="flex justify-between items-center w-full text-neutral-500">
              <span className="text-xs font-semibold uppercase w-full">
                Uploaded prescriptions
              </span>

              <ScrollText size={23} />
            </div>

            <h4 className="lg:text-4xl font-semibold tracking-tight text-neutral-900 sm:text-xl">
              0
            </h4>

            <span className="text-xs font-semibold w-full text-neutral-500">
              prescriptions in repository
            </span>
          </div>

          <div className="flex justify-start items-start flex-col lg:gap-y-2 bg-neutral-100 p-4 w-full h-46 shadow rounded-xl">
            <div className="flex justify-between items-center w-full text-neutral-500">
              <span className="text-xs font-semibold uppercase w-full">
                Allocated storage
              </span>

              <LockOpen size={23} />
            </div>

            <h4 className="lg:text-4xl font-semibold tracking-tight text-neutral-900 sm:text-xl">
              50 MB
            </h4>

            <span className="text-xs font-semibold w-full text-neutral-500">
              encrypted patient vault
            </span>
          </div>

          <div className="flex justify-start items-start flex-col lg:gap-y-2 bg-neutral-100 p-4 w-full h-46 shadow rounded-xl">
            <div className="flex justify-between items-center w-full text-neutral-500">
              <span className="text-xs font-semibold uppercase w-full">
                Remaining storage
              </span>

              <CloudCheck size={23} />
            </div>

            <h4 className="lg:text-2xl font-semibold tracking-tight text-neutral-900 sm:text-xl">
              50 MB
            </h4>

            <div className="w-full h-2 rounded-full bg-green-700 lg:mt-2" />
            <span className="text-xs font-semibold w-full text-green-700">
              100% available
            </span>

            <span className="text-xs font-semibold w-full text-neutral-400 lg:mt-5">
              0 KB consumed of 50 MB
            </span>
          </div>
        </div>

        <div className="flex justify-start items-start w-[60%] lg:mt-6 lg:p-6 bg-neutral-100 shadow rounded-xl">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-200 text-red-700">
              <Trash size={23} />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
                Delete account
              </h4>

              <div className="flex justify-start items-start w-full lg:gap-x-6">
                <p className="mt-1 text-sm text-neutral-500 lg:[60%]">
                  Permanently remove your Friede account. This action is
                  destructive and cannot be undone.
                </p>

                <Button
                  className={
                    "bg-red-600 hover:bg-red-700 text-neutral-200 hover:text-neutral-300"
                  }
                >
                  <UserRoundMinus size={23} /> Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
