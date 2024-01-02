/*
  Warnings:

  - Added the required column `usersId` to the `Sponsorships` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sponsorships" ADD COLUMN     "usersId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Sponsorships" ADD CONSTRAINT "Sponsorships_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
