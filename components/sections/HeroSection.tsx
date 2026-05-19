"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "motion/react";
import { ChevronDownIcon } from "lucide-react";
import { Mrs_Saint_Delafield } from "next/font/google";

import Container from "../aetherium/Container";
import Text from "../aetherium/Text";

import Intro from "@/components/sections/Intro";

import { wait } from "@/lib/utils";
import { useToggle } from "@/hooks/useToggle";

import heroImage from "@/public/images/hero-background.webp";

const cedarville = Mrs_Saint_Delafield({ weight: "400", subsets: ["latin"] });

const HeroSection = () => {
  const [isIntroAlmostComplete, handleIsIntroAlmostComplete] = useToggle(false);
  const [isIntroPlaying, handleIsIntroPlaying] = useToggle(true);

  const trevinText = useAnimation();
  const andText = useAnimation();
  const carisaText = useAnimation();
  const twoBecomeOneText = useAnimation();
  const dateText = useAnimation();
  const scrollText = useAnimation();

  useEffect(() => {
    if (!isIntroAlmostComplete) {
      (async () => {
        Promise.all([
          trevinText.start({ scale: 0.9, opacity: 1, transition: { duration: 2 } }),
          carisaText.start({ scale: 0.9, opacity: 1, transition: { duration: 2 } }),
          andText.start({ scale: 1, opacity: 1, transition: { duration: 1 } }),
          await wait(1900),
          andText.start({ rotateY: 720, transition: { duration: 1 } }),
          trevinText.start({ scale: 1, opacity: 1, transition: { duration: 0.2 } }),
          carisaText.start({ scale: 1, opacity: 1, transition: { duration: 0.2 } }),
          twoBecomeOneText.start({ y: 0, opacity: 1, transition: { duration: 1 } }),
          await wait(500),
          dateText.start({ y: 0, opacity: 1, transition: { duration: 1 } }),
          await wait(500),
          scrollText.start({ y: 0, opacity: 1, transition: { duration: 0.5 } }),
        ]);
      })();
    }
  }, [isIntroAlmostComplete, trevinText, andText, carisaText, twoBecomeOneText, dateText, scrollText]);

  return (
    <>
      {/* {isIntroPlaying && <Intro handleIsIntroAlmostComplete={handleIsIntroAlmostComplete} handleIsIntroPlaying={handleIsIntroPlaying} />} */}
      <Container as="section" className="z-40 relative h-dvh bg-cover select-none">
        <Image
          src={heroImage.src}
          alt="An image of the soon to be married couple Trevin and Carisa walking and laughing."
          fill
          objectFit="cover"
          objectPosition="67% 100%"
          quality={70}
        />
        <Container className="bg-black/20 absolute top-0 left-0 w-full h-full flex flex-col justify-between">
          <Container className="grow flex flex-col justify-center">
            <Container
              className={`${cedarville.className} relative h-64 overflow-hidden w-full mx-auto text-[6rem] 
              sm:w-2/3 xl:w-full 2xl:w-4/5 min-[2560px]:w-4/5!
              xl:text-[8rem] min-[2560px]:text-[12rem]!
              xl:h-84 min-[2560px]:grow! min-[2560px]:top-12!
              
           `}>
              <motion.h1
                initial={{ scale: 2, opacity: 0 }}
                animate={trevinText}
                className="absolute top-0 left-1/4 -translate-x-1/4
              ">
                Trevin
              </motion.h1>
              <motion.h1
                initial={{ scale: 2, opacity: 0 }}
                animate={andText}
                className="absolute top-25 left-1/2 -translate-x-1/2 text-[3rem]
                xl:text-[5rem]
                xl:top-30 min-[2560px]:top-48!
                ">
                &
              </motion.h1>
              <motion.h1
                initial={{ scale: 2, opacity: 0 }}
                animate={carisaText}
                className="absolute top-34 right-1/4 translate-x-1/4
                xl:top-44 min-[2560px]:top-60!
             ">
                Carisa
              </motion.h1>
            </Container>
          </Container>

          <Container className="h-1/2 space-y-4 text-center flex flex-col justify-end">
            <motion.h6
              initial={{ y: 25, opacity: 0 }}
              animate={twoBecomeOneText}
              className={`${cedarville.className} text-[3rem] h-15 overflow-hidden`}>
              Two Become One
            </motion.h6>

            <motion.div initial={{ y: 50, opacity: 0 }} animate={dateText} className="font-semibold grid grid-cols-3 gap-4 items-center px-10 mb-8">
              <Text className="border-y py-4">SATURDAY</Text>
              <Container>
                <Text>MAY</Text>
                <Text className="text-[2.5rem]">16</Text>
                <Text>2026</Text>
              </Container>
              <Text className="border-y py-4">4:00 PM</Text>
            </motion.div>

            <motion.div initial={{ y: 50, opacity: 0 }} animate={scrollText} className="text-center mb-8">
              <Text className="font-semibold text-xs mb-2">OUR STORY, HIS PLAN</Text>
              <motion.div
                className="mx-auto w-fit"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse" }}>
                <ChevronDownIcon />
              </motion.div>
            </motion.div>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default HeroSection;
