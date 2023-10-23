/*
  Warnings:

  - Added the required column `fullDate` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `match` ADD COLUMN `fullDate` VARCHAR(191) NOT NULL;
