"use client";

import Text from "../aetherium/Text";

import Category from "../Category";
import Location from "../Location";
import Section from "../Section";

import ScrollDownIcon from "../ScrollDownIcon";

import { useWeddingContext } from "../WeddingProvider";
import { Button } from "../ui/button";

import categoryTwo from "@/public/images/category-2.webp";
import sectionTwo from "@/public/images/section-2.webp";
import RSVPModal from "../RSVPModal";
import { useToggle } from "@/hooks/useToggle";
import { useEffect, useState } from "react";
import { getInvitationByEmail } from "@/lib/actions";
import { InvitationWithInvitees } from "@/lib/types";

const TheBigDay = () => {
  const { tangerineFont, invitationEmail } = useWeddingContext();
  const [isRsvpOpen, toggleIsRsvpOpen] = useToggle(false);
  const [invitation, setInvitation] = useState<null | InvitationWithInvitees>(null);

  useEffect(() => {
    (async () => {
      const result = await getInvitationByEmail(invitationEmail);
      if (result?.invitation) setInvitation(result.invitation);
    })();
  }, []);

  return (
    <>
      <Category title="The Big Day" imageSrc={categoryTwo.src} imagePosition="100% 50%">
        Everything you need to know for the day we say “I do.”
      </Category>

      <Section imageSrc={sectionTwo.src} imagePosition="45% 100%" className="text-center pt-36 pb-12">
        <Text className="text-sm mb-8 font-bold">BOTH THE CEREMONY & RECEPTION WILL TAKE PLACE AT:</Text>
        <Location
          className="mb-16"
          name="Ascott Parc Event Centre"
          street="2839 RUTHERFORD ROAD"
          city="VAUGHAN, ON"
          googleHref="https://maps.app.goo.gl/fR4CL8SWnEjKgKPG7"
        />

        <Text className="text-sm mb-8 font-bold">OUR CEREMONY WILL BE HELD AT:</Text>
        <h2 className={`text-5xl mb-4 ${tangerineFont}`}>The Garden Gazebo</h2>
        <h3 className="text-xl mb-16 font-semibold">AT 4:00 PM</h3>

        <Text className="text-sm mb-8 font-bold">FOLLOWED BY COCKTAIL HOUR AND DINNER AT:</Text>
        <h2 className={`text-5xl mb-16 ${tangerineFont}`}>The Trillium Hall</h2>

        <Button variant="secondary" className="mb-4 md:w-1/4 mx-auto" onClick={toggleIsRsvpOpen}>
          {invitation?.rsvp ? "VIEW YOUR RSVP" : "RSVP NOW"}
        </Button>

        {/* <Text className="text-xs mb-42">
          RSVPs open until <b>Saturday February 21, 2026</b>
        </Text> */}

        <ScrollDownIcon text="ACCOMODATIONS" />
      </Section>
      {isRsvpOpen && <>{invitation && <RSVPModal invitation={invitation} setInvitation={setInvitation} toggleIsRsvpOpen={toggleIsRsvpOpen} />}</>}
    </>
  );
};

export default TheBigDay;
