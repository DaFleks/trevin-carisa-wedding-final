import Container from "@/components/aetherium/Container";

import Sidebar from "@/components/invitations/Sidebar";
import "./scrollbar-reset.css";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container className="size-full bg-neutral-300 text-slate-600 flex items-center">
      <Container className="mx-auto bg-neutral-200 border overflow-hidden border-neutral-100 shadow-md flex 
      size-full w-[90%] min-[1920px]:w-3/5">
        <Sidebar />
        <Container as="main" className="grow flex flex-col bg-neutral-100 overflow-y-auto relative">
          {children}
        </Container>
      </Container>
    </Container>
  );
};

export default layout;
