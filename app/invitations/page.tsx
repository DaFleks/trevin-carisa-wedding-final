import Container from "@/components/aetherium/Container";
import Text from "@/components/aetherium/Text";
import StatusCheck from "@/components/invitations/StatusCheck";
import MealResult from "@/components/invitations/MealResult";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { CircleQuestionMark, MailIcon, UserCheck, UserIcon, UserX } from "lucide-react";
import Stat from "@/components/invitations/Stat";

export const revalidate = 0; // 👈 always fetch live DB data
export const fetchCache = "force-no-store";

const page = async () => {
  const invitations = await prisma.invitation.findMany({
    include: { invitees: true },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const rsvpCount = invitations.filter((invitation) => invitation.rsvp === true).length;
  const attendingCount = invitations.flatMap((invite) => invite.invitees ?? []).filter((guest) => guest.isAttending === "ATTENDING").length;
  const notAttendingCount = invitations.flatMap((invite) => invite.invitees ?? []).filter((guest) => guest.isAttending === "NOTATTENDING").length;
  const pendingCount = invitations.flatMap((invite) => invite.invitees ?? []).filter((guest) => guest.isAttending === "PENDING").length;
  const inviteesTotalCount = invitations.flatMap((invite) => invite.invitees ?? []).length;
  return (
    <>
      <Container className="sticky top-0 bg-neutral-100 z-50 p-4 space-y-4">
        <h6 className="text-4xl font-medium">Invite List</h6>
        <Container className="grid grid-cols-5 gap-4 sticky top-0 bg-neutral-100">
          <Stat label="RSVPs" value={`${rsvpCount} / ${invitations.length}`} icon={<MailIcon className="text-slate-600" />} />
          <Stat label="Invitees" value={inviteesTotalCount} icon={<UserIcon className="text-slate-600" />} />
          <Stat label="Pending" value={pendingCount} icon={<CircleQuestionMark className="text-slate-600" />} />
          <Stat label="Attending" value={attendingCount} icon={<UserCheck className="text-emerald-600" />} />
          <Stat label="Not Attending" value={notAttendingCount} icon={<UserX className="text-rose-600" />} />
        </Container>
      </Container>

      <ul className="space-y-4 p-4">
        {invitations.map((i) => (
          <li key={i.id} className="border list-none bg-white shadow w-full">
            <Container className="p-4 space-y-4">
              <Container>
                <Text className="font-medium text-2xl mb-4">{i.title}</Text>
                <Separator />
              </Container>

              <Container className="flex justify-between gap-16">
                <Container className="space-y-4 w-full">
                  <Table className="bg-slate-100/25 border">
                    <TableHeader className="bg-slate-600 text-white">
                      <TableRow>
                        <TableHead className="w-1/4">Invitee</TableHead>
                        <TableHead className="text-center">Attending</TableHead>
                        <TableHead className="text-center">Is a Child?</TableHead>
                        <TableHead className="text-center">Meal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {i.invitees.map((invitee) => (
                        <TableRow key={invitee.id}>
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {i.note && (
                    <Container className="space-y-2">
                      <Text className="text-xl font-medium">Notes</Text>
                      <Container className="bg-slate-100/25 border p-4">
                        <Text>{i.note}</Text>
                      </Container>
                    </Container>
                  )}
                </Container>
                <Container className="flex flex-col gap-4">
                  {i.rsvp && (
                    <Container className="w-48 text-center font-medium bg-emerald-400/25 text-emerald-800 select-none p-3 rounded-lg">
                      RSVP Confirmed!
                    </Container>
                  )}
                  {!i.rsvp && (
                    <Container className="w-48 text-center font-medium bg-rose-400/25 text-rose-800 select-none p-3 rounded-lg">
                      No RSVP Yet!
                    </Container>
                  )}
                  <Button asChild className="bg-slate-600 hover:bg-slate-600/90">
                    <Link href={`/invitations/${i.id}`}>Edit Invitation</Link>
                  </Button>
                  {/* <ResetInvitationButton id={i.id} /> */}
                </Container>
              </Container>
            </Container>
          </li>
        ))}
      </ul>
    </>
  );
};

export default page;
