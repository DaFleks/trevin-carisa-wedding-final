"use client";

import Container from "../aetherium/Container";
import Text from "../aetherium/Text";

import Section from "../Section";
import Category from "../Category";
import Timestamp from "../Timestamp";
import ScrollDownIcon from "../ScrollDownIcon";

import { useWeddingContext } from "../WeddingProvider";

import categoryOne from "@/public/images/category-1.webp";
import sectionOne from "@/public/images/section-1.webp";

const OurStory = () => {
  const { tangerineFont } = useWeddingContext();
  return (
    <>
      <Category title="Our Story So Far" imageSrc={categoryOne.src} imagePosition="47%">
        <Text className="italic mb-4">
          “So they are no longer two, but one flesh.
          <br />
          Therefore what God has joined together,
          <br />
          let no man separate.”
        </Text>
        <Text className="italic font-semibold">— Matthew 19:6 (KJV)</Text>
      </Category>
      <Section imageSrc={sectionOne.src} imagePosition="100% 100%">
        <Container className="space-y-8 mb-48">
          <h2 className={`text-6xl text-center ${tangerineFont}`}>The Timeline</h2>
          <Timestamp title="2008 — Growing Together">
            Trevin and Carisa met in grade 10 marketing class at Woburn Collegiate, where they formed a band called The Playmakers. Their
            friendship grew through countless jams and a school talent show, though Trevin secretly kept his crush to himself.
          </Timestamp>
          <Timestamp title="2017 — The Adventures">
            While still best friends, Trevin often picked Carisa up from work with her favorite treats. One night at Canoe, he gave her 11
            white roses and one artificial one, saying, “I’ll love you until the last one dies.” Carisa laughed in surprise, realizing they
            shared the same feelings.
          </Timestamp>
          <Timestamp title="2024 — The Proposal">
            On April 2, 2024, Trevin took Carisa to her favorite place, surrounded by the animals she loves. As she prepared to sing while
            he played guitar—just like old times—he got down on one knee and asked her to be his wife.
          </Timestamp>
        </Container>
        <ScrollDownIcon text="THE BIG DAY" />
      </Section>
    </>
  );
};

export default OurStory;
