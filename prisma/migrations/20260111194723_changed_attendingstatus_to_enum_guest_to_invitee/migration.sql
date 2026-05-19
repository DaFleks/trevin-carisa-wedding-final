/*
  Warnings:

  - You are about to drop the `Guest` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AttendingStatus" AS ENUM ('PENDING', 'ATTENDING', 'NOTATTENDING');

-- DropForeignKey
ALTER TABLE "Guest" DROP CONSTRAINT "Guest_invitationId_fkey";

-- DropTable
DROP TABLE "Guest";

-- CreateTable
CREATE TABLE "Invitee" (
    "id" TEXT NOT NULL,
    "invitationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "isAttending" "AttendingStatus" NOT NULL DEFAULT 'PENDING',
    "isChild" BOOLEAN NOT NULL DEFAULT false,
    "meal" "MealOptions" NOT NULL DEFAULT 'BEEF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invitee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invitee" ADD CONSTRAINT "Invitee_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
