/*
  Warnings:

  - You are about to drop the column `Rounded` on the `match` table. All the data in the column will be lost.
  - You are about to drop the column `awayTeamId` on the `match` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeamId` on the `match` table. All the data in the column will be lost.
  - Added the required column `away` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `home` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rounded` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `match` DROP FOREIGN KEY `Match_awayTeamId_fkey`;

-- DropForeignKey
ALTER TABLE `match` DROP FOREIGN KEY `Match_homeTeamId_fkey`;

-- AlterTable
ALTER TABLE `match` DROP COLUMN `Rounded`,
    DROP COLUMN `awayTeamId`,
    DROP COLUMN `homeTeamId`,
    ADD COLUMN `away` VARCHAR(191) NOT NULL,
    ADD COLUMN `home` VARCHAR(191) NOT NULL,
    ADD COLUMN `rounded` VARCHAR(191) NOT NULL;
