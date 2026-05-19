/*
  Warnings:

  - You are about to drop the column `city` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `isBringingPlusOne` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `mealOptions` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `streetAddress` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `invitationId` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Person" DROP CONSTRAINT "Person_invitationId_fkey";

-- DropIndex
DROP INDEX "public"."Guest_email_key";

-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "createdAt",
DROP COLUMN "firstName",
DROP COLUMN "isBringingPlusOne",
DROP COLUMN "lastName",
DROP COLUMN "mealOptions",
DROP COLUMN "note",
DROP COLUMN "phoneNumber",
DROP COLUMN "postalCode",
DROP COLUMN "province",
DROP COLUMN "streetAddress",
DROP COLUMN "updatedAt",
ADD COLUMN     "invitationId" TEXT NOT NULL,
ADD COLUMN     "isChild" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "meal" "MealOptions" NOT NULL DEFAULT 'BEEF',
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "isAttending" DROP NOT NULL,
ALTER COLUMN "isAttending" DROP DEFAULT;

-- DropTable
DROP TABLE "public"."Person";

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
