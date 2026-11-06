import { Button } from "@/components/ui/button";
import Footer from "../Unverified/Footer";
import Navbar from "../Unverified/Navbar";
import { CircleCheck, Lock, ShieldCheck, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useClerk, useUser } from "@clerk/react";
import { useAuthorization } from "@/hooks/useAuthorization";
import { useSignUp } from "@/hooks/useSignUp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignUpBasic = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { clearResult } = useAuthorization();
  const { setUserId, name, setName, setEmail, setProfilePictureUrl } =
    useSignUp();

  const navigate = useNavigate();

  useEffect(() => {
    setName(user?.fullName!);
  }, [isSignedIn]);

  const handleSignOut = async () => {
    await signOut({ redirectUrl: "/" });
    clearResult();
  };

  const handleContinue = () => {
    setUserId(user?.id!);
    setName(name!);
    setEmail(user?.emailAddresses[0].emailAddress!);
    setProfilePictureUrl(user?.imageUrl!);

    navigate("/signup/allergy");
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-start items-start w-full lg:h-min min-h-screen flex-col gap-y-10  lg:px-16 px-6 py-4 lg:py-20">
        <div className="flex justify-center items-center w-full gap-x-2 lg:mb-14 mb-10 lg:mt-0 mt-4">
          <div className="flex justify-center items-center flex-col gap-y-2">
            <div className="flex justify-center items-center w-10 h-10 rounded-[100%] bg-green-700">
              <User color="white" />
            </div>

            <h6 className="text-xs text-green-700 font-medium">Your Profile</h6>
          </div>

          <div className="bg-neutral-200 h-1 w-50 rounded-xl" />

          <div className="flex justify-center items-center flex-col gap-y-2">
            <div className="flex justify-center items-center w-10 h-10 rounded-[100%] bg-green-700">
              <h5 className="text-neutral-200 text-xl font-semibold">2</h5>
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
        <div className="flex justify-start items-start w-full flex-col gap-y-4">
          <Button
            variant={"secondary"}
            className={
              "rounded-full bg-green-100 text-green-700 hover:bg-green-100"
            }
            size={"xs"}
          >
            <ShieldCheck color="green" /> FRIEDE PATIENT ONBOARDING
          </Button>

          <h2 className="lg:text-5xl text-4xl font-semibold text-neutral-800">
            Let&apos;s setup your profile.
          </h2>

          <h6 className="lg:w-[50%] text-base text-neutral-600">
            Confirm your details before we personalize your Friede medication
            companion experience.
          </h6>
        </div>
        <div className="flex justify-start items-start w-full bg-green-100/50 lg:px-4 lg:py-4 px-6 py-2 rounded-xl gap-x-4 shadow">
          <img
            className="lg:w-20 lg:h-18 w-28 h-20 rounded-[100%]"
            src={user?.imageUrl!}
            alt={user?.imageUrl!}
          />

          <div className="flex justify-start items-start w-full flex-col mt-4">
            <h6 className="text-base font-semibold text-neutral-800">
              {user?.fullName!}
            </h6>

            <span className="lg:w-[50%] lg:text-sm text-xs text-neutral-600 flex items-center w-full">
              <CircleCheck color="green" size={14} className="mr-1" /> Google
              Authenticated Account
            </span>
          </div>
        </div>

        <div className="flex justify-start items-start flex-col gap-y-2 w-full">
          <Label>
            Full Name<sup className="text-red-600">*</sup>
          </Label>
          <Input
            className="lg:w-80 w-full"
            value={name!}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex justify-start items-start flex-col gap-y-2 w-full">
          <Label>
            Email Address<sup className="text-red-600">*</sup>
          </Label>
          <Input
            className="lg:w-80 w-full"
            disabled
            value={user?.emailAddresses[0].emailAddress!}
          />

          <span className="flex items-center w-full text-xs text-neutral-600 gap-x-1">
            <Lock size={12} /> Verified via Google OAuth 2.0
          </span>
        </div>

        <div className="flex justify-start items-start lg:flex-row flex-col gap-y-2 lg:gap-x-4 w-full">
          <Button
            className={
              "bg-green-700 text-green-100 hover:bg-green-800 py-6 lg:w-min w-full"
            }
            size={"lg"}
            onClick={handleContinue}
          >
            Continue
          </Button>

          <Button
            variant={"ghost"}
            className={"py-6 lg:w-min w-full text-neutral-600"}
            size={"lg"}
            onClick={handleSignOut}
          >
            Cancel and Logout
          </Button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignUpBasic;
