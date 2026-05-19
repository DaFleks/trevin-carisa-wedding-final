"use client";

import { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import Container from "../aetherium/Container";

import { createInvitation } from "@/lib/actions";

const InvitationForm = () => {
  const [title, setTitle] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await createInvitation(title);
    if (result?.success) router.push(`/invitations/${result.invitation.id}`);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Container className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="e.g. Jean & Lisa"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </Container>
      <Button className="bg-emerald-600 hover:bg-emerald-600/90">Next</Button>
    </form>
  );
};

export default InvitationForm;
