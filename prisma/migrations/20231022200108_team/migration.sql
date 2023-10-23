/*
  Warnings:

  - You are about to drop the column `awayTeamId` on the `matchs` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeamId` on the `matchs` table. All the data in the column will be lost.
  - Added the required column `away` to the `Matchs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `home` to the `Matchs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `matchs` DROP FOREIGN KEY `Matchs_awayTeamId_fkey`;

-- DropForeignKey
ALTER TABLE `matchs` DROP FOREIGN KEY `Matchs_homeTeamId_fkey`;

-- AlterTable
ALTER TABLE `matchs` DROP COLUMN `awayTeamId`,
    DROP COLUMN `homeTeamId`,
    ADD COLUMN `away` VARCHAR(191) NOT NULL,
    ADD COLUMN `home` VARCHAR(191) NOT NULL,
    MODIFY `date` VARCHAR(191) NOT NULL;
