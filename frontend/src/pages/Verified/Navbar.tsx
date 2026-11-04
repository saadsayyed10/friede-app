import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useAllergy } from "@/hooks/useAllergy";
import { useSignUp } from "@/hooks/useSignUp";
import { useClerk } from "@clerk/react";
import { Bell, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { signOut } = useClerk();
  const { reset: allergyReset } = useAllergy();
  const { reset: userReset } = useSignUp();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      userReset();
      allergyReset();

      new Promise<void>((resolve) => setTimeout(resolve, 3000));

      await signOut({ redirectUrl: "/" });
    } catch (error: any) {
      toast.add({
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex justify-between items-center w-full px-6 py-4 lg:px-20 lg:py-6">
      <Link to={"/friede"} className="text-4xl text-green-700 font-semibold">
        Friede
      </Link>
      <ul className="lg:flex hidden justify-end items-end w-full lg:gap-x-6">
        <Link to={"/friede/scan"}>
          <li>Scan</li>
        </Link>
        <Link to={"/friede/chat"}>
          <li>Chat</li>
        </Link>
        <li className="cursor-pointer">Inbox</li>
        <Link to={"/friede/settings"}>
          <li>Settings</li>
        </Link>
      </ul>

      <div className="flex lg:hidden justify-end items-end w-full gap-x-4">
        <Bell size={23} color="gray" />
        <span onClick={handleSignOut}>
          {loading ? <Spinner /> : <LogOut size={23} color="gray" />}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
