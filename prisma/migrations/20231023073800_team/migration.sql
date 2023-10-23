/*
  Warnings:

  - Added the required column `awayLogo` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeLogo` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `match` ADD COLUMN `awayLogo` VARCHAR(191) NOT NULL,
    ADD COLUMN `homeLogo` VARCHAR(191) NOT NULL;
