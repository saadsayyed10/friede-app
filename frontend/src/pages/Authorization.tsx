import { Button } from "@/components/ui/button";
import Footer from "./Unverified/Footer";
import Navbar from "./Unverified/Navbar";
import { KeyRound, Shield } from "lucide-react";
import { useClerk, useUser } from "@clerk/react";
import { useEffect } from "react";

const Authorization = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut({ redirectUrl: "/" });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // const handleVerifyUser = async () => {

  // }

  useEffect(() => {
    if (user) {
      console.log(user.id);
    }
  }, [isSignedIn]);

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center w-full lg:h-min min-h-screen flex-col lg:gap-y-16 gap-y-12">
        <div className="flex justify-center items-center w-full flex-col gap-y-4 text-center">
          <Button
            variant={"secondary"}
            className={
              "rounded-full bg-green-100 text-green-700 hover:bg-green-100"
            }
            size={"xs"}
          >
            <Shield color="green" fill="green" /> Identity Protocol Active
          </Button>

          <h2 className="lg:text-5xl text-4xl font-semibold text-neutral-800 text-center">
            Google OAuth <span onClick={handleSignOut}>Authorization</span>
          </h2>

          <h6 className="lg:w-[60%] text-base text-neutral-600 text-center">
            State machine diagnostics for Google SSO, Clerk identity claims and
            MongoDB patient registry handshake.
          </h6>
        </div>

        <div className="flex justify-center items-center w-full flex-col gap-y-4 text-center">
          <div className="flex justify-center items-center w-20 h-20 rounded-[100%] bg-green-100 rotate-y-180 border-2 border-green-700 animate-spin">
            <KeyRound color="green" className="rotate-45" />
          </div>

          <h4 className="lg:text-3xl text-2xl font-semibold text-neutral-800 text-center">
            Verifying your account...
          </h4>

          <h6 className="lg:w-[45%] lg:text-sm text-xs text-neutral-600 text-center">
            Please wait while we securely verify your Google credentials with
            Clerk... Do not refresh the page.
          </h6>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Authorization;
