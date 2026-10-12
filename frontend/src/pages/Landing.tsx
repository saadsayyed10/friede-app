import { Button } from "@/components/ui/button";
import Navbar from "./Unverified/Navbar";
import { Badge } from "lucide-react";

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-start items-center w-full min-h-screen bg-white lg:py-10 lg:px-20 flex-col lg:gap-y-10">
        {/* Hero Section */}
        <div className="flex justify-center items-center w-full">
          <div className="flex justify-start items-start flex-col w-[50%] lg:gap-y-6">
            <Button
              variant={"secondary"}
              className={
                "rounded-full bg-green-100 text-green-700 hover:bg-green-100"
              }
            >
              <Badge fill="green" /> AI Medication Companion
            </Button>
            <h2 className="text-6xl font-semibold text-neutral-800">
              Understand your
              <br />
              medicines with
              <br />
              <span className="text-green-700">confidence.</span>
            </h2>
          </div>
          <div className="flex justify-center items-center w-[50%]"></div>
        </div>
      </div>
    </>
  );
};

export default Landing;
