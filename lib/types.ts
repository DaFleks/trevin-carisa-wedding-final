import { AttendingStatus, MealOptions } from "@prisma/client";

export type InvitationWithInvitees = {
  invitees: {
    email: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    invitationId: string;
    isAttending: AttendingStatus;
    isChild: boolean;
    meal: MealOptions;
  }[];
} & {
  title: string;
  id: string;
  note: string | null;
  rsvp: boolean;
  createdAt: Date;
  updatedAt: Date;
};
