"use client";

import { Montserrat } from "next/font/google";

import Container from "./aetherium/Container";

import HeroSection from "@/components/sections/HeroSection";
import OurStory from "./sections/OurStory";
import TheBigDay from "./sections/TheBigDay";
import Accomodations from "./sections/Accomodations";
import Footer from "./sections/Footer";
import Image from "next/image";

import background from "@/public/images/main-background.webp";
import FAQs from "./sections/FAQs";

const montserrat = Montserrat({
  subsets: ["latin"],
});

const WeddingApp = () => {
  return (
    <Container
      className={`${montserrat.className} bg-black size-full overflow-y-hidden border-4 border-white lg:border-0 [text-shadow:2px_2px_8px_rgba(0,0,0,0.5)] relative`}>
      <Image src={background} alt="Clouds in the sky." fill style={{ objectFit: "cover" }} />
      <Container className="fixed size-full bg-black/40 top-0 left-0">
        <Container className="size-full overflow-y-auto relative">
          <Container className="w-full md:w-4/5 lg:w-3/5 xl:w-1/2 min-[1920px]:w-1/2! mx-auto xl:shadow-2xl xl:shadow-black z-10 relative">
            <HeroSection />
            <OurStory />
            <TheBigDay />
            <Accomodations />
            <FAQs />
            <Footer />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default WeddingApp;
