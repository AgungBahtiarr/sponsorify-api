/*
  Warnings:

  - Added the required column `profilePhoto` to the `Sponsorships` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sponsorships" ADD COLUMN     "profilePhoto" TEXT NOT NULL;
