import {
  CloudCheck,
  Database,
  LockOpen,
  MilkOff,
  ScrollText,
  Shield,
  User,
  ChevronsUpDown,
} from "lucide-react";
import Navbar from "./Navbar";
import { useSignUp } from "@/hooks/useSignUp";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "../Unverified/Footer";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { getToken, useClerk } from "@clerk/react";
import { deleteUserAccountAPI } from "@/api/authentication.api";
import { Spinner } from "@/components/ui/spinner";
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
import { useAllergy } from "@/hooks/useAllergy";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Settings = () => {
  const {
    name,
    email,
    profilePictureUrl,
    userId,
    reset: userReset,
  } = useSignUp();
  const { allergies, reset: allergyReset } = useAllergy();
  const { signOut } = useClerk();

  const [openDeleteAccount, setOpenDeleteAccount] = useState<boolean>(false);
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false);

  const handleAccountDelete = async () => {
    setDeleteLoader(true);
    try {
      const token = await getToken();

      await deleteUserAccountAPI(token!);

      userReset();
      allergyReset();

      await signOut({ redirectUrl: "/" });
    } catch (error: any) {
      toast.add({
        title: "Failed to delete account",
        description:
          "Server is busy right now, please try again after few minutes",
      });
    } finally {
      setDeleteLoader(false);
    }
  };

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

        {/* Laptop and Desktop screen */}
        <div className="lg:flex hidden justify-between items-center w-full gap-10">
          <div className="flex justify-start items-start flex-col gap-y-2 bg-neutral-100 p-4 w-full h-46 shadow rounded-xl">
            <div className="flex justify-between items-center w-full text-neutral-500">
              <span className="text-xs font-semibold uppercase w-full">
                Uploaded prescriptions
              </span>

              <ScrollText size={23} />
            </div>

            <h4 className="lg:text-4xl font-semibold tracking-tight text-neutral-900 text-xl">
              0
            </h4>

            <span className="text-xs font-semibold w-full text-neutral-500">
              prescriptions in repository
            </span>
          </div>

          <div className="flex justify-start items-start flex-col gap-y-2 bg-neutral-100 p-4 w-full h-46 shadow rounded-xl">
            <div className="flex justify-between items-center w-full text-neutral-500">
              <span className="text-xs font-semibold uppercase w-full">
                Allocated storage
              </span>

              <LockOpen size={23} />
            </div>

            <h4 className="lg:text-4xl font-semibold tracking-tight text-neutral-900 text-xl">
              50 MB
            </h4>

            <span className="text-xs font-semibold w-full text-neutral-500">
              encrypted patient vault
            </span>
          </div>

          <div className="flex justify-start items-start flex-col gap-y-2 bg-neutral-100 p-4 w-full h-46 shadow rounded-xl">
            <div className="flex justify-between items-center w-full text-neutral-500">
              <span className="text-xs font-semibold uppercase w-full">
                Remaining storage
              </span>

              <CloudCheck size={23} />
            </div>

            <h4 className="lg:text-2xl font-semibold tracking-tight text-neutral-900 text-xl">
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

        {/* Mobile screen */}
        <div className="block lg:hidden w-full overflow-x-auto overscroll-x-contain pb-3 lg:overflow-visible">
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

        {allergies.length !== 0 && (
          <div className="flex justify-start items-start flex-col gap-y-2 w-full">
            <div className="flex justify-start items-start w-full my-6">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-green-700">
                  <MilkOff size={23} />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-xl font-semibold tracking-tight text-neutral-900">
                    Allergic Information
                  </h4>
                  <p className="mt-1 text-sm text-neutral-500">
                    Extracted summary of allergen clincial information
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-start items-start flex-col lg:w-160 bg-green-100/50 rounded-xl border shadow gap-y-6 p-4">
              <div className="flex justify-between items-center w-full">
                <h6 className="font-semibold text-sm flex items-center gap-x-1">
                  <Shield size={16} color="green" fill="green" /> Identified
                  Allergens for Clinical Record
                </h6>
                <span className="bg-green-500 px-2 py-1 text-green-800 text-xs rounded-full font-semibold lg:block hidden">
                  {allergies.length} items Structured
                </span>
              </div>

              {allergies.map((data, idx) => (
                <div
                  key={idx}
                  className="shadow rounded-xl bg-neutral-50 flex justify-start items-start flex-col gap-y-2 w-full px-4 py-2"
                >
                  <div className="flex justify-between items-center w-full">
                    <h6 className="font-semibold text-lg">
                      {data.allergy} Allergen
                    </h6>
                    <span
                      className={`${data.risk === "Low" && "bg-red-200 text-red-700"} ${data.risk === "Moderate" && "bg-yellow-200 text-yellow-700"} ${data.risk === "High" && "bg-green-200 text-green-700"} px-2 py-1 text-xs rounded-full font-semibold lg:block hidden`}
                    >
                      {data.risk} Risk
                    </span>
                  </div>
                  <h6 className="lg:text-sm text-neutral-600">{data.cause}</h6>
                  <span
                    className={`${data.risk === "Low" && "bg-red-200 text-red-700"} ${data.risk === "Moderate" && "bg-yellow-200 text-yellow-700"} ${data.risk === "High" && "bg-green-200 text-green-700"} px-2 py-1 text-xs rounded-full font-semibold block lg:hidden`}
                  >
                    {data.risk} Risk
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-start items-start lg:w-[60%] w-full mt-6 lg:p-6 p-4 bg-neutral-100 shadow rounded-xl">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-200">
              <User size={23} color="green" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xl font-semibold tracking-tight text-neutral-900">
                Manage account
              </h4>

              <div className="flex justify-start items-start w-full lg:flex-row flex-col gap-y-4 lg:gap-x-6">
                <p className="mt-1 text-sm text-neutral-500 lg:w-[60%]">
                  Permanently remove your Friede account or update your account,
                  everything can be managed from here
                </p>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button className={"lg:mt-0 mt-6"}>
                        <ChevronsUpDown size={23} /> Options
                      </Button>
                    }
                  >
                    Open
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={"w-60"}>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Update Options</DropdownMenuLabel>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Allergy Summary</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Delete Options</DropdownMenuLabel>
                      <DropdownMenuItem>Allergy Memory</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOpenDeleteAccount(true)}
                      >
                        Account
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={openDeleteAccount} onOpenChange={setOpenDeleteAccount}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={
                "bg-red-500 hover:bg-red-700 text-white hover:text-white"
              }
              onClick={handleAccountDelete}
            >
              {deleteLoader ? <Spinner /> : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </>
  );
};

export default Settings;
