"use client";

import { FormEvent, MouseEvent, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { PencilIcon, TrashIcon } from "lucide-react";

import { Invitee } from "@prisma/client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

import Text from "../aetherium/Text";
import Container from "../aetherium/Container";

import MealResult from "./MealResult";
import InviteeForm from "./InviteeForm";
import StatusCheck from "./StatusCheck";

import { deleteInviteeById, updateInvitationNoteById, updateInvitationTitleById } from "@/lib/actions";
import { InvitationWithInvitees } from "@/lib/types";
import { useToggle } from "@/hooks/useToggle";
import Loading from "../aetherium/Loading/Loading";
import { Separator } from "../ui/separator";

interface InvitationFormUpdateProps {
  invitation: InvitationWithInvitees;
}

const InvitationFormUpdate = (props: InvitationFormUpdateProps) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [currentInvitee, setCurrentInvitee] = useState<Invitee | undefined>(undefined);
  const [isLoading, toggleIsLoading] = useToggle(false);
  const router = useRouter();

  useEffect(() => {
    setTitle(props.invitation.title);
    setNotes(props.invitation.note ?? "");
  }, [props.invitation.title, props.invitation.note]);

  const handleUpdateTitle = async (e: FormEvent) => {
    e.preventDefault();
    toggleIsLoading();
    await updateInvitationTitleById(props.invitation.id, title);
    toggleIsLoading();
    router.refresh();
  };

  const handleSelectCurrentInvitee = (id?: string) => {
    if (!id) setCurrentInvitee(undefined);
    if (id) setCurrentInvitee(props.invitation.invitees.find((invitee) => invitee.id === id));
  };

  const handleDeleteInvitee = async (e: MouseEvent<HTMLButtonElement>) => {
    toggleIsLoading();
    await deleteInviteeById(e.currentTarget.id);
    toggleIsLoading();
    handleSelectCurrentInvitee();
    router.refresh();
  };

  const handleUpdateNote = async (e: FormEvent) => {
    e.preventDefault();
    toggleIsLoading();
    await updateInvitationNoteById(props.invitation.id, notes);
    toggleIsLoading();
    router.refresh();
  };

  return (
    <>
      <Container className="bg-white p-4 shadow border flex gap-8 pr-6 overflow-y-auto grow">
        <Container className="space-y-8 w-full">
          <Container>
            <h3 className="text-2xl font-medium">Title</h3>
            <Separator orientation="horizontal" className="my-4" />
            <form onSubmit={handleUpdateTitle} className="flex items-end justify-between gap-4">
              <Container className="space-y-2 w-full">
                <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </Container>
              <Button className="bg-slate-600 hover:bg-slate-600/90 w-fit">Update Title</Button>
            </form>
          </Container>
          <Container>
            <h3 className="text-2xl font-medium">Details</h3>
            <Separator orientation="horizontal" className="my-4" />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invitee</TableHead>
                  <TableHead className="text-center">Attending</TableHead>
                  <TableHead className="text-center">Is a Child?</TableHead>
                  <TableHead className="text-center">Meal</TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.invitation.invitees.map((invitee) => (
                  <TableRow key={invitee.id} className={`${currentInvitee?.id === invitee.id && "bg-muted/50"}`}>
                    <TableCell>
                      <Text className="font-medium">{invitee.name}</Text>
                      <Text>{invitee.email}</Text>
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusCheck status={invitee.isAttending} />
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusCheck status={invitee.isChild} />
                    </TableCell>
                    <TableCell className="text-center">
                      <MealResult meal={invitee.meal} />
                    </TableCell>
                    <TableCell className="text-end">
                      <Button variant="ghost" className="w-fit" onClick={() => handleSelectCurrentInvitee(invitee.id)}>
                        <PencilIcon />
                      </Button>
                    </TableCell>
                    <TableCell className="text-end">
                      <Button id={invitee.id} variant="ghost" className="w-fit" onClick={handleDeleteInvitee}>
                        <TrashIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Container>
          <Container>
            <h3 className="text-2xl font-medium">Notes</h3>
            <Separator orientation="horizontal" className="my-4" />
            <form onSubmit={handleUpdateNote}>
              <Container className=" space-y-4 flex gap-4">
                <Textarea
                  defaultValue={props.invitation.note ?? ""}
                  rows={12}
                  onChange={(e) => setNotes(e.currentTarget.value)}
                  className="resize-none"
                />
                <Button className="bg-slate-600 hover:bg-slate-600/90 w-fit">Update Notes</Button>
              </Container>
            </form>
          </Container>
        </Container>
        <Separator orientation="vertical" />
        <InviteeForm invitationId={props.invitation.id} invitee={currentInvitee} handleSelectCurrentInvitee={handleSelectCurrentInvitee} />
      </Container>

      {isLoading && <Loading />}
    </>
  );
};

export default InvitationFormUpdate;
