-- CreateEnum
CREATE TYPE "MealOptions" AS ENUM ('BEEF', 'CHICKEN', 'SALMON', 'VEGETARIAN', 'KIDS');

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "invitationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "isAttending" BOOLEAN,
    "isChild" BOOLEAN NOT NULL DEFAULT false,
    "meal" "MealOptions" NOT NULL DEFAULT 'BEEF',

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
