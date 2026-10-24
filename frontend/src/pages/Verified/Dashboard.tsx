import { getToken, useClerk } from "@clerk/react";
import Navbar from "./Navbar";
import { fetchUserProfileAPI } from "@/api/authentication.api";
import { useEffect, useState } from "react";
import { useSignUp } from "@/hooks/useSignUp";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

const Dashboard = () => {
  const { setUserId, setName, setEmail, setProfilePictureUrl } = useSignUp();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirectUrl: "/" });
  };

  const handleFetchProfile = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      await fetchUserProfileAPI(token!)
        .then((res) => {
          console.log(res.data.user);
          const user = res.data.user;

          setUserId(user.clerkId!);
          setName(user.name!);
          setEmail(user.email!);
          setProfilePictureUrl(user.profilePictureUrl!);

          navigate("/friede/settings");
        })
        .catch((err) => console.log(err?.response.data.error));
    } catch (error: any) {
      console.log(error.message);
      await signOut({ redirectUrl: "/" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchProfile();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex justify-start items-start w-full lg:h-min min-h-screen flex-col gap-y-10 lg:px-16 px-6 py-4 lg:py-20">
        <h1 className="text-3xl font-medium text-neutral-800 text-center">
          WORK IN PROGRESS
        </h1>
        {loading ? (
          <Spinner />
        ) : (
          <Button onClick={handleSignOut}>Logout</Button>
        )}
      </div>
    </>
  );
};

export default Dashboard;
