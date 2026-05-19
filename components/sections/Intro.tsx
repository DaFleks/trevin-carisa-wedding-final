"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "motion/react";

import { wait } from "@/lib/utils";

import trevinImage from "@/public/images/intro-trevin.webp";
import carisaImage from "@/public/images/intro-carisa.webp";

const MotionImage = motion(Image);

interface IntroProps {
  handleIsIntroAlmostComplete: () => void;
  handleIsIntroPlaying: () => void;
}

const Intro = (props: IntroProps) => {
  const trevControls = useAnimation();
  const carisaControls = useAnimation();
  const mainControls = useAnimation();

  useEffect(() => {
    (async () => {
      await Promise.all([
        trevControls.start({ opacity: 1, transition: { duration: 2 } }),
        trevControls.start({ y: -15, transition: { duration: 5 } }),
        await wait(3000),
        trevControls.start({ opacity: 0, transition: { duration: 2 } }),
        await wait(2000),
        carisaControls.start({ opacity: 1, transition: { duration: 2 } }),
        carisaControls.start({ y: -15, transition: { duration: 5 } }),
        await wait(3000),
        carisaControls.start({ opacity: 0, transition: { duration: 2 } }),
        await wait(2000),
      ]);
      mainControls.start({ opacity: 0, transition: { duration: 4 } });
      await wait(500);
      props.handleIsIntroAlmostComplete();
      await wait(3500);
      props.handleIsIntroPlaying();
    })();
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 h-full w-full xl:w-1/3 xl:left-1/2
       bg-white border-4 border-white overflow-hidden z-50!"
      initial={{ opacity: 1 }}
      animate={mainControls}>
      <MotionImage
        src={trevinImage.src}
        alt="An image of the groom Trevin John with his arms folded."
        fill
        objectFit="cover"
        className="scale-275 origin-top translate-x-[15%] -translate-y-[35%] overflow-hidden"
        initial={{ y: 0, opacity: 0 }}
        animate={trevControls}
      />
      <MotionImage
        src={carisaImage.src}
        alt="An image of the bride Carisa Rodrigues looking off into the distance."
        fill
        objectFit="cover"
        className="scale-175 origin-top translate-x-[10%]"
        initial={{ y: 0, opacity: 0 }}
        animate={carisaControls}
      />
    </motion.div>
  );
};

export default Intro;
