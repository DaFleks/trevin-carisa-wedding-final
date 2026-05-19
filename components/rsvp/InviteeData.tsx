"use client";

import Container from "../aetherium/Container";
import Text from "../aetherium/Text";
import { Button } from "../ui/button";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";
import { AttendingStatus, Invitee, MealOptions } from "@prisma/client";

interface InviteeDataProps {
  invitee: Invitee;
  handleIsAttending: (inviteeId: string, isAttending: AttendingStatus) => void;
  handleMeal: (guestId: string, meal: MealOptions) => void;
}

const InviteeData = (props: InviteeDataProps) => {
  return (
    <Container className="space-y-6 bg-neutral-800 p-4 shadow-md shadow-black rounded-lg">
      <Text className="font-bold text-lg">{props.invitee.name.toUpperCase()}</Text>

      <Container className="space-y-4 overflow-hidden">
        <Button
          type="button"
          onClick={() => props.handleIsAttending(props.invitee.id, "ATTENDING")}
          variant="ghost"
          className={`border-2 border-emerald-400 hover:bg-emerald-400/50 hover:text-white 
            ${props.invitee.isAttending === "ATTENDING" && "bg-emerald-400/50"}`}>
          Attending
        </Button>
        <Button
          type="button"
          onClick={() => props.handleIsAttending(props.invitee.id, "NOTATTENDING")}
          variant="ghost"
          className={`border-2 border-rose-400 hover:bg-rose-400/50 hover:text-white 
          ${props.invitee.isAttending === "NOTATTENDING" && "bg-rose-400/50"}`}>
          Not Attending
        </Button>
      </Container>
      <Container className="space-y-4">
        <Label className="font-medium">Meal Selection</Label>
        {props.invitee.isChild ? (
          <Select disabled>
            <SelectTrigger className="w-full bg-white font-semibold">
              <SelectValue placeholder="Kids Meal" />
            </SelectTrigger>
          </Select>
        ) : (
          <Select value={props.invitee.meal} onValueChange={(v) => props.handleMeal(props.invitee.id, v as MealOptions)}>
            <SelectTrigger className="w-full bg-white text-black font-semibold">
              <SelectValue placeholder="Select an entree" />
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
        )}
      </Container>
    </Container>
  );
};

export default InviteeData;
