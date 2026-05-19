"use client";

import { resetInvitationById } from "@/lib/actions";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface ResetInvitationButtonProps {
  id: string;
}

const ResetInvitationButton = (props: ResetInvitationButtonProps) => {
  const router = useRouter();

  const handleResetInvitation = async () => {
    await resetInvitationById(props.id);
    router.refresh();
  };

  return (
    <Button variant="outline" className="w-48 bg-slate-700 hover:bg-slate-700/90 hover:text-white text-white" onClick={handleResetInvitation}>
      Reset
    </Button>
  );
};

export default ResetInvitationButton;
