"use client";

import { MealOptions } from "@prisma/client";
import { GiChicken, GiCow, GiDinosaurRex, GiFishCorpse, GiSolidLeaf } from "react-icons/gi";
import Container from "../aetherium/Container";

const MealResult = ({ meal }: { meal: MealOptions }) => {
  switch (meal) {
    case "CHICKEN":
      return (
        <Container className="mx-auto w-fit">
          <GiChicken className="h-8 w-8 text-red-600" />
        </Container>
      );
    case "BEEF":
      return (
        <Container className="mx-auto w-fit">
          <GiCow className="h-8 w-8 text-blue-600" />
        </Container>
      );
    case "SALMON":
      return (
        <Container className="mx-auto w-fit">
          <GiFishCorpse className="h-8 w-8 text-pink-600" />
        </Container>
      );
    case "VEGETARIAN":
      return (
        <Container className="mx-auto w-fit">
          <GiSolidLeaf className="h-8 w-8 text-emerald-600" />
        </Container>
      );
    case "KIDS":
      return (
        <Container className="mx-auto w-fit">
          <GiDinosaurRex className="h-8 w-8 text-amber-600" />
        </Container>
      );
  }
};

export default MealResult;
