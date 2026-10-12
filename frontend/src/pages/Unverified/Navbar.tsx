import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-white flex justify-between items-center w-full lg:px-20 lg:py-6">
      <h3 className="lg:text-4xl text-green-700 font-semibold">Friede</h3>
      <Button
        variant={"secondary"}
        className={
          "rounded-full bg-green-100 text-green-700 hover:bg-green-100"
        }
        size={"xs"}
      >
        <Lock /> HIPAA Encrypted
      </Button>
    </div>
  );
};

export default Navbar;
