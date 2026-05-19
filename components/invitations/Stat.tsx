"use client";

import Container from "../aetherium/Container";
import Text from "../aetherium/Text";

interface StatProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

const Stat = (props: StatProps) => {
  return (
    <Container className="bg-white border p-4 shadow flex items-center justify-between">
      <Container>
        <Text className="font-medium text-sm">{props.label}</Text>
        <Text className="font-bold text-3xl">{props.value}</Text>
      </Container>
      {props.icon}
    </Container>
  );
};

export default Stat;
