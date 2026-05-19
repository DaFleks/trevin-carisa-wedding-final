"use client";

import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Loading from "./aetherium/Loading/Loading";
import { useToggle } from "@/hooks/useToggle";

const SignOutButton = () => {
  const [isLoading, handleIsLoading] = useToggle(false);
  const router = useRouter();

  return (
    <>
      <Button
        className="bg-slate-700 hover:bg-slate-700/90"
        onClick={async () => {
          handleIsLoading();
          const response = await fetch("/api/auth", { method: "DELETE" });
          const data = await response.json();
          handleIsLoading();
          if (data.status === 204) router.refresh();
          if (data.status !== 204) alert("There was an error logging out.");
        }}>
        <LogOutIcon />
        Sign Out
      </Button>
      {isLoading && <Loading />}
    </>
  );
};

export default SignOutButton;
