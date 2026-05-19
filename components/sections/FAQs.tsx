"use client";

import Text from "../aetherium/Text";
import Category from "../Category";
import Section from "../Section";
import { useWeddingContext } from "../WeddingProvider";
import categoryFour from "@/public/images/category-4.webp";
import sectionFour from "@/public/images/section-4.webp";

const FAQs = () => {
  const { tangerineFont } = useWeddingContext();

  return (
    <>
      <Category title="FAQs" imageSrc={categoryFour.src} imagePosition="50% 100%">
        Your questions answered.
      </Category>

      <Section imageSrc={sectionFour.src} imagePosition="45% 100%" className="text-center w-full 2xl:w-4/5 mx-auto py-48">
        <h2 className={`text-5xl mb-4 ${tangerineFont}`}>Are the ceremony and reception at the same location?</h2>
        <Text className="text-sm mb-16 font-medium">
          Yes! We wanted to make everything as convenient as possible for our guests. The ceremony will begin promptly at 4:00 PM at the Garden Gazebo
          (outdoor), followed by cocktail hour and dinner in the Trillium Hall (indoor).
        </Text>

        <h2 className={`text-5xl mb-4 ${tangerineFont}`}>Can I bring a guest?</h2>
        <Text className="text-sm mb-16 font-medium">
          Due to venue capacity, we are only able to accommodate the guests listed on each invitation. Thank you so much for your understanding.
        </Text>

        <h2 className={`text-5xl mb-4 ${tangerineFont}`}>Is parking available?</h2>
        <Text className="text-sm mb-16 font-medium">Yes — there is ample complimentary parking available at the venue.</Text>

        <h2 className={`text-5xl mb-4 ${tangerineFont}`}>Will there be an open bar?</h2>
        <Text className="text-sm mb-16 font-medium">
          Yes! Drinks are on us. Please enjoy responsibly and plan safe transportation. We’ve included a list of nearby hotel recommendations above
          for your convenience.
        </Text>

        <h2 className={`text-5xl mb-4 ${tangerineFont}`}>Gifts</h2>
        <Text className="text-sm mb-16 font-medium">
          In lieu of boxed gifts, a monetary contribution toward the start of our future would be greatly appreciated. But the greatest gift of all is
          your presence with us!
        </Text>
      </Section>
    </>
  );
};

export default FAQs;
