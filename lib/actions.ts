"use server";

import { AttendingStatus, Invitee, MealOptions } from "@prisma/client";
import prisma from "./prisma";
import { InvitationWithInvitees } from "./types";
import { revalidatePath } from "next/cache";

export async function verifyEmail(email: string) {
  const normalized = email.trim().toLowerCase();

  const invitation = await prisma.invitation.findFirst({
    where: {
      invitees: {
        some: { email: normalized }, // invitation must have at least one guest with this email
      },
    },
    include: {
      invitees: { where: { email: normalized } }, // optional: only return the matching guest(s)
    },
  });

  if (!invitation) return { success: false };

  return { success: true, invitation }; // invitation will be null if no match
}

export async function updateInvitationById(invitationId: string, data: InvitationWithInvitees) {
  try {
    await prisma.invitation.update({
      where: { id: invitationId },
      data: {
        note: data.note,
        invitees: {
          update: data.invitees.map((invitee) => ({
            where: { id: invitee.id },
            data: {
              name: invitee.name,
              email: invitee.email?.trim().toLowerCase(),
              isAttending: invitee.isAttending,
              isChild: invitee.isChild,
              meal: invitee.meal,
            },
          })),
        },
      },
      include: { invitees: true },
    });
  } catch (e) {
    console.error(e);
  }
}

export async function rsvpById(invitationId: string, data: InvitationWithInvitees) {
  try {
    await prisma.invitation.update({
      where: { id: invitationId },
      data: {
        rsvp: true,
        note: data.note,
        invitees: {
          update: data.invitees.map((invitee) => ({
            where: { id: invitee.id },
            data: {
              name: invitee.name,
              email: invitee.email,
              isAttending: invitee.isAttending,
              isChild: invitee.isChild,
              meal: invitee.meal,
            },
          })),
        },
      },
      include: { invitees: true },
    });
  } catch (e) {
    console.error(e);
  }
}

export async function createInvitation(title: string) {
  try {
    const invitation = await prisma.invitation.create({
      data: {
        title: title,
      },
    });

    return { success: true, invitation };
  } catch (e) {
    console.error(e);
  }
}

export async function updateInvitationTitleById(id: string, title: string) {
  try {
    await prisma.invitation.update({ where: { id: id }, data: { title: title } });
  } catch (e) {
    console.error(e);
  }

  return { success: true };
}

export async function updateInvitationNoteById(id: string, note: string) {
  try {
    await prisma.invitation.update({ where: { id: id }, data: { note: note } });
  } catch (e) {
    console.error(e);
  }

  return { success: true };
}

export async function getInvitationByEmail(email: string) {
  try {
    const invitation = await prisma.invitation.findFirst({
      where: {
        invitees: {
          some: {
            email: { equals: email, mode: "insensitive" },
          },
        },
      },
      include: {
        invitees: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return { success: true, invitation };
  } catch (e) {
    console.error(e);
    return { success: false, invitation: null };
  }
}

export async function createInvitee(
  name: string,
  email: string,
  isAttending: AttendingStatus,
  isChild: boolean,
  meal: MealOptions,
  invitationId: string
) {
  try {
    await prisma.invitee.create({
      data: {
        name: name,
        email: email.trim().toLowerCase(),
        isAttending: isAttending,
        isChild: isChild,
        meal: isChild ? "KIDS" : meal,
        invitationId: invitationId,
      },
    });
  } catch (e) {
    console.error(e);
  }

  return { success: true };
}

export async function updateInviteeById(id: string, name: string, email: string, isAttending: AttendingStatus, isChild: boolean, meal: MealOptions) {
  try {
    await prisma.invitee.update({
      where: { id: id },
      data: {
        name: name,
        email: email.trim().toLowerCase(),
        isAttending: isAttending,
        isChild: isChild,
        meal: isChild ? "KIDS" : meal,
      },
    });
    revalidatePath("/");
  } catch (e) {
    console.error(e);
  }
}

export async function deleteInviteeById(id: string) {
  try {
    await prisma.invitee.delete({ where: { id: id } });
    return { success: true };
  } catch (e) {
    console.error(e);
  }
}

export async function resetInvitationById(id: string) {
  try {
    await prisma.invitation.update({
      where: { id },
      data: {
        rsvp: false,
        invitees: {
          updateMany: [
            {
              where: {},
              data: {
                isAttending: "PENDING",
              },
            },
            {
              where: { isChild: false },
              data: {
                meal: "CHICKEN",
              },
            },
          ],
        },
      },
      include: { invitees: true },
    });

    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
}

export async function deleteInvitationById(id: string) {
  try {
    await prisma.invitee.deleteMany({ where: { invitationId: id } });
    await prisma.invitation.delete({ where: { id: id } });
    return { success: true };
  } catch (e) {
    console.error(e);
  }
}
