import { Bell, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
        <Bell />
        <User />
      </div>
    </div>
  );
};

export default Navbar;
