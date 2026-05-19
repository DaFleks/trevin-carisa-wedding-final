"use client";

import VerificationGate from "./VerificationGate";
import WeddingApp from "./WeddingApp";
import WeddingProvider from "./WeddingProvider";

import { useToggle } from "@/hooks/useToggle";

const WeddingWrapper = () => {
  const [isVerified, handleIsVerified] = useToggle(false);

  return <WeddingProvider>{isVerified ? <WeddingApp /> : <VerificationGate handleIsVerified={handleIsVerified} />}</WeddingProvider>;
};

export default WeddingWrapper;
