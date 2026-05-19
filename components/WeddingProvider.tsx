"use client";

import { Tangerine } from "next/font/google";
import { createContext, useContext, useState } from "react";

const tangerine = Tangerine({ weight: ["400", "700"], subsets: ["latin"] });

interface WeddingContextType {
  tangerineFont: string;
  handleSetInvitation: (email: string) => void;
  invitationEmail: string;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

const WeddingProvider = ({ children }: { children: React.ReactNode }) => {
  const [invitationEmail, setInvitationEmail] = useState("");

  const handleSetInvitation = (email: string) => setInvitationEmail(email);

  return (
    <WeddingContext.Provider
      value={{ tangerineFont: tangerine.className, handleSetInvitation: handleSetInvitation, invitationEmail: invitationEmail }}>
      {children}
    </WeddingContext.Provider>
  );
};

export function useWeddingContext() {
  const context = useContext(WeddingContext);
  if (!context) throw new Error("useWeddingContext must be used within a WeddingProvider");
  return context;
}

export default WeddingProvider;
