"use client";

import { cn } from "@/lib/utils";
import Container from "./aetherium/Container";

interface ModalProps {
  children?: React.ReactNode;
  className?: string;
}

const Modal = (props: ModalProps) => {
  return (
    <Container className="fixed h-full w-full bg-black/50 top-0 left-0 z-50 flex justify-center items-center">
      <Container className={cn("bg-white p-8 rounded-lg", props.className)}>{props.children}</Container>
    </Container>
  );
};

export default Modal;
