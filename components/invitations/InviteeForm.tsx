"use client";

import { createInvitee, updateInviteeById } from "@/lib/actions";
import { FormEvent, useEffect, useState } from "react";
import Container from "../aetherium/Container";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { AttendingStatus, Invitee, MealOptions } from "@prisma/client";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Loading from "../aetherium/Loading/Loading";
import { useToggle } from "@/hooks/useToggle";
import { Separator } from "../ui/separator";

interface InviteeFormProps {
  invitationId: string;
  invitee?: Invitee;
  handleSelectCurrentInvitee: (id?: string) => void;
}

const InviteeForm = (props: InviteeFormProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isAttending, setIsAttending] = useState<AttendingStatus>("PENDING");
  const [isChild, setIsChild] = useState(false);
  const [meal, setMeal] = useState<MealOptions>(MealOptions.CHICKEN);
  const [isLoading, toggleIsLoading] = useToggle(false);

  useEffect(() => {
    if (props.invitee) {
      setName(props.invitee.name ?? "");
      setEmail(props.invitee.email ?? "");
      setIsAttending(props.invitee.isAttending ?? "PENDING");
      setIsChild(props.invitee.isChild);
      setMeal(props.invitee.meal);
    }
  }, [props.invitee]);

  const router = useRouter();

  const handleCreateInvitee = async (e: FormEvent) => {
    e.preventDefault();

    toggleIsLoading();
    await createInvitee(name, email, isAttending, isChild, meal, props.invitationId);
    toggleIsLoading();

    resetForm();
    router.refresh();
  };

  const handleUpdateInvitee = async (e: FormEvent) => {
    e.preventDefault();

    toggleIsLoading();
    props.handleSelectCurrentInvitee(); //  Toggle to reset invitee selection
    await updateInviteeById(props.invitee!.id, name, email, isAttending, isChild, meal);
    toggleIsLoading();

    resetForm();
    router.refresh();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setIsAttending("PENDING");
    setIsChild(false);
    setMeal(MealOptions.CHICKEN);
  };

  return (
    <>
      <form onSubmit={props.invitee ? handleUpdateInvitee : handleCreateInvitee} className="space-y-6 w-1/2">
        <Container>
          {!props.invitee && <h3 className="text-2xl font-medium">Add an Invitee</h3>}
          {props.invitee && <h3 className="text-2xl font-medium">Update an Invitee</h3>}
          <Separator orientation="horizontal" className="my-4" />
        </Container>

        <Container className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </Container>

        <Container className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Container>

        <Container>
          <Label htmlFor="isAttending" className="mb-4">
            Attending Status
          </Label>
          <RadioGroup
            id="isAttending"
            value={isAttending}
            onValueChange={(v) => setIsAttending(v as AttendingStatus)}
            className="flex items-center gap-4 col-span-3">
            <Container className="flex items-center gap-2">
              <RadioGroupItem value="PENDING" id="r1" />
              <Label htmlFor="r1">Pending</Label>
            </Container>
            <Container className="flex items-center gap-2">
              <RadioGroupItem value="ATTENDING" id="r2" />
              <Label htmlFor="r2">Attending</Label>
            </Container>
            <Container className="flex items-center gap-2">
              <RadioGroupItem value="NOTATTENDING" id="r3" />
              <Label htmlFor="r3">Not Attending</Label>
            </Container>
          </RadioGroup>
        </Container>

        <Container className="flex items-center gap-2">
          <Label htmlFor="email">Is a Child?</Label>
          <Switch checked={isChild} onCheckedChange={(value) => setIsChild(value)} />
        </Container>

        <Container className="space-y-2 w-1/2">
          <Label>Meal Option</Label>
          <Select disabled={isChild} value={meal} onValueChange={(v) => setMeal(v as MealOptions)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a meal" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Meals</SelectLabel>
                <SelectItem value="CHICKEN">Chicken</SelectItem>
                <SelectItem value="BEEF">Beef</SelectItem>
                <SelectItem value="SALMON">Salmon</SelectItem>
                <SelectItem value="VEGETARIAN">Vegetarian</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Container>

        {props.invitee && <Button className="bg-emerald-600 hover:bg-emerald-600/90">Update Invitee</Button>}
        {!props.invitee && <Button className="bg-emerald-600 hover:bg-emerald-600/90">Add Invitee</Button>}
      </form>
      {isLoading && <Loading />}
    </>
  );
};

export default InviteeForm;
