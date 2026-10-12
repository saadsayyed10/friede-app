import { Button } from "@/components/ui/button";
import {
  ArrowLeftRight,
  Link2,
  MessageCircleQuestionMark,
  Server,
} from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-white flex justify-between items-center w-full lg:px-20 lg:py-6">
      <span className="lg:text-sm text-neutral-400 w-full">
        Saad Sayyed &copy; Groven
      </span>
      <div className="flex justify-end items-end w-full opacity-50">
        <Button variant={"link"} size={"sm"}>
          <Link2 size={10} /> Portfolio
        </Button>

        <Button variant={"link"} size={"sm"}>
          <ArrowLeftRight size={10} /> API Design
        </Button>

        <Button variant={"link"} size={"sm"}>
          <Server size={10} /> System Design
        </Button>

        <Button variant={"link"} size={"sm"}>
          <MessageCircleQuestionMark size={10} /> Help
        </Button>
      </div>
    </div>
  );
};

export default Footer;
