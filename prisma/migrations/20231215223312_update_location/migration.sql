/*
  Warnings:

  - You are about to drop the column `cityId` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `districtId` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `provinceId` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `Sponsorships` table. All the data in the column will be lost.
  - You are about to drop the column `districtId` on the `Sponsorships` table. All the data in the column will be lost.
  - You are about to drop the column `provinceId` on the `Sponsorships` table. All the data in the column will be lost.
  - You are about to drop the `Cities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Districs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Provinces` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Sponsorships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Sponsorships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Sponsorships` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Events` DROP FOREIGN KEY `Events_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `Events` DROP FOREIGN KEY `Events_districtId_fkey`;

-- DropForeignKey
ALTER TABLE `Events` DROP FOREIGN KEY `Events_provinceId_fkey`;

-- DropForeignKey
ALTER TABLE `Sponsorships` DROP FOREIGN KEY `Sponsorships_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `Sponsorships` DROP FOREIGN KEY `Sponsorships_districtId_fkey`;

-- DropForeignKey
ALTER TABLE `Sponsorships` DROP FOREIGN KEY `Sponsorships_provinceId_fkey`;

-- AlterTable
ALTER TABLE `Events` DROP COLUMN `cityId`,
    DROP COLUMN `districtId`,
    DROP COLUMN `provinceId`,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `district` VARCHAR(191) NOT NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Sponsorships` DROP COLUMN `cityId`,
    DROP COLUMN `districtId`,
    DROP COLUMN `provinceId`,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `district` VARCHAR(191) NOT NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Cities`;

-- DropTable
DROP TABLE `Districs`;

-- DropTable
DROP TABLE `Provinces`;
