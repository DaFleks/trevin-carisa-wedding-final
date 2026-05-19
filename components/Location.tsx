"use client";

import { SquareArrowOutUpRightIcon } from "lucide-react";
import Container from "./aetherium/Container";
import Text from "./aetherium/Text";

import { useWeddingContext } from "./WeddingProvider";
import Link from "next/link";

interface LocationProps {
  name?: string;
  street?: string;
  city?: string;
  phone?: string;
  className?: string;
  googleHref?: string;
}

const Location = (props: LocationProps) => {
  const { tangerineFont } = useWeddingContext();

  return (
    <Container className={props.className}>
      <Container className="mb-4 flex gap-2 justify-center">
        <h2 className={`text-5xl ml-4 ${tangerineFont}`}>{props.name}</h2>
        <Link target="_blank" href={props.googleHref ?? "#"}>
          <SquareArrowOutUpRightIcon className="w-4! h-4!" />
        </Link>
      </Container>

      <Text className="text-sm">{props.street}</Text>
      <Text className="text-sm">{props.city}</Text>
      <Text className="text-sm">{props.phone}</Text>
    </Container>
  );
};

export default Location;
