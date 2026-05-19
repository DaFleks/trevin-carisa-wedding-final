"use client";

import Link from "next/link";

import Container from "../aetherium/Container";
import Text from "../aetherium/Text";

const Footer = () => {
  return (
    <Container
      as="footer"
      className="text-center text-xs text-neutral-500 border-t border-neutral-800 py-4 space-y-2 bg-neutral-900 flex flex-col justify-center">
      <Text>© 2026 Trevin & Carisa</Text>
      <Text>
        Site by&#160;
        <Link href="mailto:petropoulosalex@gmail.com" className="underline">
          Alex Petropoulos
        </Link>
        &#160;of 101Creatives
      </Text>
    </Container>
  );
};

export default Footer;
