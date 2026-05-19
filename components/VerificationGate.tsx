"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import Text from "./aetherium/Text";
import Loading from "./aetherium/Loading/Loading";

import Section from "./Section";

import { useWeddingContext } from "./WeddingProvider";
import { verifyEmail } from "@/lib/actions";
import { useToggle } from "@/hooks/useToggle";
import loginBg from "@/public/images/login-background.webp";

interface VerificationGateProps {
  handleIsVerified: () => void;
}

const VerificationGate = (props: VerificationGateProps) => {
  //  Hooks
  const [email, setEmail] = useState<string>("");
  const [formMessage, setFormMessage] = useState<string>(`Before we roll out the red carpet,\nwhat’s the email we sent your invite to?`);
  const [isLoading, handleIsLoading] = useToggle(false);
  const { tangerineFont, handleSetInvitation } = useWeddingContext();

  //  Submit Function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    handleIsLoading();
    const result = await verifyEmail(email);
    handleIsLoading();

    if (result?.success && result.invitation) {
      handleSetInvitation(email);
      setFormMessage("We’re so happy you’re here —\nlet’s get you RSVP’d and ready for the big day.");
      setTimeout(() => {
        props.handleIsVerified();
      }, 3000);
    }

    if (!result?.success) setFormMessage("Bummer, we didn’t find that email.\nMaybe try another one?");
  };

  return (
    <>
      <Section
        imageSrc={loginBg.src}
        imagePosition="48% 50%"
        className="text-center justify-start absolute left-1/2 -translate-x-1/2 top-1/3 -translate-y-1/3  
      w-full md:w-1/2 lg:w-1/3! xl:w-1/3! 2xl:w-1/4!">
        <h1 className={`text-7xl ${tangerineFont}`}>{formMessage[0] === "B" ? "Welcome!" : "Thanks!"}</h1>

        <Text className="text-sm whitespace-pre-line">{formMessage}</Text>

        {formMessage[0] === "B" && (
          <form className="space-y-8 mt-8" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Button variant="outline">Submit</Button>
          </form>
        )}
      </Section>
      {isLoading && <Loading />}
    </>
  );
};

export default VerificationGate;
