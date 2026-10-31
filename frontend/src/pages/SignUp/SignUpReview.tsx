import { Button } from "@/components/ui/button";
import Footer from "../Unverified/Footer";
import Navbar from "../Unverified/Navbar";
import { Check, Eye, Shield, ShieldCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/useSignUp";
import { useAuthorization } from "@/hooks/useAuthorization";
import { getToken, useClerk } from "@clerk/react";
import { toast } from "@/components/ui/toast";
import { useEffect, useState } from "react";
import { syncClerkUserAPI } from "@/api/authentication.api";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";
import { useAllergy } from "@/hooks/useAllergy";

const SignUpReview = () => {
  const { signOut } = useClerk();
  const { userId, name, email, profilePictureUrl, reset } = useSignUp();
  const { clearResult } = useAuthorization();
  const { allergies, reset: allergyReset } = useAllergy();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut({ redirectUrl: "/" });
    clearResult();
  };

  const handleSignUp = async () => {
    if (!userId || !name || !email || !profilePictureUrl) {
      toast.add({
        title: "Failed to sync your account",
        description: "Please enter all the details to sync your account",
      });

      return;
    }

    setLoading(true);
    try {
      const token = await getToken();

      await syncClerkUserAPI(
        userId!,
        name!,
        email!,
        allergies,
        profilePictureUrl!,
        token!,
      )
        .then((res) => {
          console.log(res.data.message);

          toast.add({
            title: "Account synced to Friede app",
            description: res.data.message,
          });

          reset();
          allergyReset();
          navigate("/friede");
        })
        .catch((err) => {
          console.log(err?.response?.data.error);

          toast.add({
            title: "Failed to sync your account",
            description: err?.response?.data.error,
          });
        });
    } catch (error: any) {
      toast.add({
        title: "Failed to sync your account",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Allergies: " + allergies.length);
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex justify-start items-start w-full lg:h-min min-h-screen flex-col gap-y-10  lg:px-16 px-6 py-4 lg:py-20">
        <div className="flex justify-center items-center w-full gap-x-2 lg:mb-14 mb-10 lg:mt-0 mt-4">
          <div className="flex justify-center items-center flex-col gap-y-2">
            <div className="flex justify-center items-center w-10 h-10 rounded-[100%] bg-green-700">
              <Check color="white" />
            </div>

            <h6 className="text-xs text-neutral-400 font-medium">
              Your Profile
            </h6>
          </div>

          <div className="bg-green-700 h-1 w-50 rounded-xl" />

          <div className="flex justify-center items-center flex-col gap-y-2">
            <div className="flex justify-center items-center w-10 h-10 rounded-[100%] bg-green-700">
              <Check color="white" />
            </div>

            <h6 className="text-xs text-neutral-400 font-medium">Allergies</h6>
          </div>

          <div className="bg-green-700 h-1 w-50 rounded-xl" />

          <div className="flex justify-center items-center flex-col gap-y-2">
            <div className="flex justify-center items-center w-10 h-10 rounded-[100%] bg-green-700">
              <h5 className="text-neutral-200 text-xl font-semibold">
                <Eye color="white" />
              </h5>
            </div>

            <h6 className="text-xs text-green-700 font-medium">Review</h6>
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
            <ShieldCheck color="green" /> FINAL STEP
          </Button>

          <h2 className="lg:text-5xl text-4xl font-semibold text-neutral-800">
            Review your information.
          </h2>

          <h6 className="lg:w-[50%] text-base text-neutral-600">
            Make sure everything is correct before creating your Friede account.
          </h6>
        </div>

        <div className="flex justify-start items-start flex-col gap-y-2 w-full">
          <Label>
            Full Name<sup className="text-red-600">*</sup>
          </Label>
          <Input className="lg:w-80 w-full" disabled value={name!} />
        </div>
        <div className="flex justify-start items-start flex-col gap-y-2 w-full">
          <Label>
            Email Address<sup className="text-red-600">*</sup>
          </Label>
          <Input className="lg:w-80 w-full" disabled value={email!} />
        </div>
        {allergies.length !== 0 && (
          <div className="flex justify-start items-start flex-col gap-y-2 w-full">
            <Label>Summary of your Allergies</Label>
            <div className="flex justify-start items-start flex-col w-160 bg-green-100/50 rounded-xl border shadow lg:gap-y-6 p-4">
              <div className="flex justify-between items-center w-full">
                <h6 className="font-semibold text-sm flex items-center gap-x-1">
                  <Shield size={16} color="green" fill="green" /> Identified
                  Allergens for Clinical Record
                </h6>
                <span className="bg-green-500 px-2 py-1 text-green-800 text-xs rounded-full font-semibold">
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
                      className={`${data.risk === "Low" && "bg-red-200 text-red-700"} ${data.risk === "Moderate" && "bg-yellow-200 text-yellow-700"} ${data.risk === "High" && "bg-green-200 text-green-700"} px-2 py-1 text-xs rounded-full font-semibold`}
                    >
                      {data.risk} Risk
                    </span>
                  </div>
                  <h6 className="lg:text-sm text-neutral-600">{data.cause}</h6>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-start items-start lg:flex-row flex-col gap-y-2 lg:gap-x-4 w-full">
          <Button
            className={
              "bg-green-700 text-green-100 hover:bg-green-800 py-6 lg:w-min w-full"
            }
            size={"lg"}
            disabled={loading}
            onClick={handleSignUp}
          >
            {loading && <Spinner />} Sign Up
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

export default SignUpReview;
