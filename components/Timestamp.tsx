"use client";

import Container from "./aetherium/Container";
import Text from "./aetherium/Text";
import { useWeddingContext } from "./WeddingProvider";

interface TimestampProps {
  title?: string;
  children?: React.ReactNode;
}

const Timestamp = (props: TimestampProps) => {
  const { tangerineFont } = useWeddingContext();

  return (
    <Container className="space-y-4">
      <h3 className={`text-5xl ${tangerineFont}`}>{props.title}</h3>
      <Text className="text-sm">{props.children}</Text>
    </Container>
  );
};

export default Timestamp;
