"use client";

import { motion } from "motion/react";
import Container from "./aetherium/Container";
import Text from "./aetherium/Text";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollDownIcon {
  text?: string;
  className?: string;
}

const ScrollDownIcon = (props: ScrollDownIcon) => {
  return (
    <Container className={cn("text-center text-white w-fit mx-auto", props.className)}>
      <Text className="font-semibold text-xs mb-2">{props.text}</Text>
      <motion.div
        className="mx-auto w-fit"
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse" }}>
        <ChevronDownIcon />
      </motion.div>
    </Container>
  );
};

export default ScrollDownIcon;
