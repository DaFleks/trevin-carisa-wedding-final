import Container from "@/components/aetherium/Container";
import InvitationFormUpdate from "@/components/invitations/InvitationFormUpdate";

import prisma from "@/lib/prisma";
import DeleteInvitationBtn from "@/components/invitations/DeleteInvitationBtn";
import ResetInvitationButton from "@/components/ResetInvitationButton";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const invitation = await prisma.invitation.findFirst({ where: { id: id }, include: { invitees: { orderBy: { createdAt: "asc" } } } });

  return (
    <>
      <Container className="flex items-center justify-between w-auto p-4">
        <h6 className="text-4xl font-medium">{invitation?.title ?? ""}</h6>
        <Container className="flex items-center gap-4">
          {invitation && <ResetInvitationButton id={invitation.id} />}
          {invitation && <DeleteInvitationBtn id={invitation.id} />}
        </Container>
      </Container>
      {invitation && <InvitationFormUpdate invitation={invitation} />}
    </>
  );
};

export default page;
