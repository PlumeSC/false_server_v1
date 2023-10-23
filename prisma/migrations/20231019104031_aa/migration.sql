/*
  Warnings:

  - You are about to drop the column `img` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `news` table. All the data in the column will be lost.
  - Added the required column `content` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `news` DROP COLUMN `img`,
    DROP COLUMN `message`,
    ADD COLUMN `content` LONGTEXT NOT NULL,
    ADD COLUMN `heroImg` VARCHAR(191) NULL;
