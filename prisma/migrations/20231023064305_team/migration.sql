/*
  Warnings:

  - Added the required column `status` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `match` ADD COLUMN `status` VARCHAR(191) NOT NULL;
