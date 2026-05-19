"use client";

import { cn } from "@/lib/utils";
import Container from "./aetherium/Container";

interface OverlayContainerProps {
  className?: string;
  children?: React.ReactNode;
}

const OverlayContainer = (props: OverlayContainerProps) => {
  return (
    <Container className="relative h-full w-full grow flex flex-col">
      <Container className="bg-black/60 absolute inset-0" />
      <Container className={cn("z-10 relative", props.className)}>{props.children}</Container>
    </Container>
  );
};

export default OverlayContainer;
