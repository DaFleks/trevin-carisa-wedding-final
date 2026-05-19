"use client";

import Image from "next/image";

import Container from "./aetherium/Container";
import OverlayContainer from "./OverlayContainer";

import { cn } from "@/lib/utils";

interface SectionProps {
  imageSrc: string;
  imagePosition: string;
  children?: React.ReactNode;
  className?: string;
}

const Section = (props: SectionProps) => {
  return (
    <Container as="section" className="relative min-h-screen flex flex-col overflow-hidden">
      <Image src={props.imageSrc} alt="" fill objectFit="cover" objectPosition={props.imagePosition} />
      <OverlayContainer className={cn("grow p-8 flex flex-col justify-center", props.className)}>{props.children}</OverlayContainer>
    </Container>
  );
};

export default Section;
