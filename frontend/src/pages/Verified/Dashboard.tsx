import { useClerk } from "@clerk/react";

const Dashboard = () => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut({ redirectUrl: "/" });
  };

  return (
    <div>
      Dashboard:{" "}
      <span className="cursor-pointer" onClick={handleSignOut}>
        Logout
      </span>
    </div>
  );
};

export default Dashboard;
