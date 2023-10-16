/*
  Warnings:

  - Added the required column `team` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `news` ADD COLUMN `team` ENUM('A', 'B', 'C', 'D') NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `team` ENUM('A', 'B', 'C', 'D') NOT NULL;
