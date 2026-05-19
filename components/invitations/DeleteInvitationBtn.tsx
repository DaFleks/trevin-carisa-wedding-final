"use client";

import { deleteInvitationById } from "@/lib/actions";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const DeleteInvitationBtn = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleResetInvitation = async () => {
    await deleteInvitationById(id);
    router.push("/invitations");
  };

  return (
    <Button variant="destructive" className="w-48" onClick={handleResetInvitation}>
      Delete Invitation
    </Button>
  );
};

export default DeleteInvitationBtn;
