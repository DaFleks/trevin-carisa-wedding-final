"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangleIcon, LogInIcon } from "lucide-react";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import Container from "./aetherium/Container";
import Text from "./aetherium/Text";
import Loading from "./aetherium/Loading/Loading";

import { useToggle } from "@/hooks/useToggle";

const GuestlistLogin = () => {
  //  Hooks
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, handleIsLoading] = useToggle(false);
  const router = useRouter();

  //  Submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    handleIsLoading();

    const response = await fetch("/api/auth", { method: "POST", body: JSON.stringify({ password: password }) });
    const data = await response.json();

    handleIsLoading();

    if (data.status === 201) router.push("/invitations");
    if (data.status !== 201) setError(data.message);
  }

  return (
    <>
      <Container className="bg-white flex flex-col justify-center mx-auto p-8 space rounded border shadow-lg text-center">
        <AlertTriangleIcon className="w-12 h-12 mx-auto text-red-900 mb-4" />
        <h3 className="text-xl font-bold mb-4">Guestlist Login</h3>
        <Text className="text-sm mb-8">
          For access to the <b>Guestlist</b>, <br />
          please enter the password you were provided with.
        </Text>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Container className="space-y-4">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Container>
          {error ? <Text className="text-xs text-red-900 text-start font-bold">{error}</Text> : <Text className="text-white text-xs">**</Text>}
          <Button className="w-full font-bold py-6">
            <LogInIcon /> Log In
          </Button>
        </form>
      </Container>
      {isLoading && <Loading />}
    </>
  );
};

export default GuestlistLogin;
