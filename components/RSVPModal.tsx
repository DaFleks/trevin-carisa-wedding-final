import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import Container from "./aetherium/Container";
import Text from "./aetherium/Text";
import Modal from "./Modal";
import InviteeData from "./rsvp/InviteeData";
import { Button } from "./ui/button";
import { useWeddingContext } from "./WeddingProvider";
import { AttendingStatus, MealOptions } from "@prisma/client";
import { rsvpById } from "@/lib/actions";
import { Textarea } from "./ui/textarea";
import { InvitationWithInvitees } from "@/lib/types";
import Loading from "./aetherium/Loading/Loading";
import { useToggle } from "@/hooks/useToggle";
import { useRouter } from "next/navigation";
import { capitalize } from "@/lib/utils";
import { Separator } from "@radix-ui/react-select";
import { TriangleAlertIcon } from "lucide-react";

interface RSVPModalProps {
  invitation: InvitationWithInvitees | null;
  setInvitation: Dispatch<SetStateAction<InvitationWithInvitees | null>>;
  toggleIsRsvpOpen: () => void;
}

const RSVPModal = (props: RSVPModalProps) => {
  const { tangerineFont } = useWeddingContext();
  const [isLoading, toggleIsLoading] = useToggle(false);
  const [attendanceError, toggleAttendanceError, setAttendanceError] = useToggle(false);
  const router = useRouter();

  const handleIsAttending = (inviteeId: string, isAttending: AttendingStatus) => {
    props.setInvitation((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        invitees: prev.invitees.map((invitee) => (invitee.id === inviteeId ? { ...invitee, isAttending } : invitee)),
      };
    });
  };

  const handleMeal = (inviteeId: string, meal: MealOptions) => {
    props.setInvitation((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        invitees: prev.invitees.map((invitee) => (invitee.id === inviteeId ? { ...invitee, meal: meal } : invitee)),
      };
    });
  };

  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    props.setInvitation((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        note: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    toggleIsLoading();

    let attendingFlag = false;

    props.invitation?.invitees.map((invitee) => {
      if (invitee.isAttending === "PENDING") attendingFlag = true;
    });

    if (attendingFlag) setAttendanceError(true);

    if (!attendingFlag) {
      await rsvpById(props.invitation!.id, props.invitation!);
      props.setInvitation((prev) => ({ ...prev!, rsvp: true }));
      router.refresh();
    }

    toggleIsLoading();
  };

  return (
    <>
      <Modal className="text-white bg-transparent size-full p-0">
        {props.invitation?.rsvp ? (
          <Container
            className="h-full border-neutral-700 bg-neutral-900 p-8 overflow-y-auto mx-auto space-y-4
          w-full md:w-4/5 lg:w-3/5 xl:w-1/2 min-[1920px]:w-1/2!">
            <h1 className={`text-6xl text-center mb-4 ${tangerineFont}`}>You are confirmed!</h1>

            <Container className="text-center space-y-4">
              <Text>Thank you for confirming your RSVP!</Text>
              <Text>The details can be found below!</Text>
              <Text>
                Should ever need to review again, you can always come back to the site & find the <b>RSVP button</b>.
              </Text>
              <Text>
                If you require any changes, <br />
                <b>please contact Trevin or Carisa.</b>
              </Text>
            </Container>
            <Separator className="bg-neutral-700 w-full h-px flex-none my-8" />

            <h1 className={`text-6xl text-center mb-4 ${tangerineFont}`}>Reservation Details</h1>
            <ul
              className="grid grid-cols-1 gap-4
              md:grid-cols-2">
              {props.invitation.invitees.map((invitee) => (
                <li key={invitee.id} className="bg-neutral-800 p-4">
                  <Text className="font-bold uppercase mb-4">{invitee.name}</Text>
                  <Separator className="bg-neutral-700 w-full h-px flex-none mt-6 mb-4" />
                  <Text>
                    Status:&#160;
                    {invitee.isAttending === "ATTENDING" ? (
                      <span className="text-emerald-500 font-bold">Attending</span>
                    ) : (
                      <span className="text-red-500 font-bold">Not Attending</span>
                    )}
                  </Text>
                  {invitee.isAttending === "ATTENDING" && (
                    <Text>
                      Meal: <b>{capitalize(invitee.meal)}</b>
                    </Text>
                  )}
                </li>
              ))}
            </ul>
            <h1 className={`text-6xl text-center mb-4 ${tangerineFont}`}>Notes</h1>

            <Container className="bg-neutral-800 p-4">{props.invitation.note}</Container>

            <Button variant="outline" className="font-bold mb-24" onClick={props.toggleIsRsvpOpen}>
              Close
            </Button>
          </Container>
        ) : (
          <Container
            className="h-full border-neutral-700 bg-neutral-900 p-8 overflow-y-auto mx-auto
          w-full md:w-4/5 lg:w-3/5 xl:w-1/2 min-[1920px]:w-1/2!">
            <h1 className={`text-6xl text-center mb-4 ${tangerineFont}`}>{props.invitation?.title}</h1>

            <Text className="text-center font-medium text-sm">
              Kindly RSVP by confirming the details <br />
              of the invitation you were provided.
            </Text>

            <Separator className="bg-neutral-700 w-full h-px flex-none mt-6 mb-8" />

            <form onSubmit={handleSubmit} className="space-y-4">
              <Container
                className="grid grid-cols-1 gap-4
              md:grid-cols-2">
                {props.invitation!.invitees.map((invitee) => (
                  <InviteeData key={invitee.id} invitee={invitee} handleIsAttending={handleIsAttending} handleMeal={handleMeal} />
                ))}
              </Container>

              <Separator className="bg-neutral-700 w-full h-px mt-8 mb-6" />

              <h3 className={`text-5xl text-center ${tangerineFont}`}>Notes</h3>
              <Textarea
                placeholder="Anything we should know? (dietary needs, allergies, etc.)"
                className="bg-white resize-none h-24 text-sm text-black"
                value={props.invitation!.note ?? ""}
                onChange={handleNoteChange}></Textarea>

              <Button className="bg-emerald-700 hover:bg-emerald-700/90 font-bold mb-24">Confirm RSVP</Button>
            </form>
          </Container>
        )}
      </Modal>

      {attendanceError && (
        <Modal className="text-white bg-transparent">
          <Container className="bg-neutral-800 border border-neutral-700 p-4 space-y-8 flex flex-col justify-center shadow-md shadow-black rounded-lg">
            <TriangleAlertIcon className="w-16! h-16! mx-auto text-red-500" />
            <Text className={`text-white text-center text-sm font-medium`}>
              Please ensure every guest has selected <br /> whether they are attending or not.
            </Text>
            <Button onClick={toggleAttendanceError} variant="outline">
              Close
            </Button>
          </Container>
        </Modal>
      )}

      {isLoading && <Loading />}
    </>
  );
};

export default RSVPModal;
