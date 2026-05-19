import Container from "@/components/aetherium/Container";
import GuestlistLogin from "@/components/GuestlistLogin";

const page = () => {
  return (
    <Container className="size-full bg-neutral-100 text-black flex items-center p-4">
      <GuestlistLogin />
    </Container>
  );
};

export default page;
