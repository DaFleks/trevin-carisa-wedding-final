import Container from "@/components/aetherium/Container";
import InvitationForm from "@/components/invitations/InvitationForm";

const page = () => {
  return (
    <>
      <Container className="flex justify-center items-center h-full w-full">
        <Container className="bg-white rounded p-4 space-y-4 w-1/3 shadow-md">
          <h6 className="text-2xl font-medium">Add New Invitation</h6>
          <InvitationForm />
        </Container>
      </Container>
    </>
  );
};

export default page;
