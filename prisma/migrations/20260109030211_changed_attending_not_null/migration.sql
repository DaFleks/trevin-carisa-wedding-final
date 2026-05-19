/*
  Warnings:

  - Made the column `isAttending` on table `Guest` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Guest" ALTER COLUMN "isAttending" SET NOT NULL,
ALTER COLUMN "isAttending" SET DEFAULT false;
