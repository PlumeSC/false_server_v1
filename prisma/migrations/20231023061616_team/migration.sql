/*
  Warnings:

  - You are about to alter the column `date` on the `match` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - Added the required column `time` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `match` ADD COLUMN `time` DATETIME(3) NOT NULL,
    MODIFY `date` DATETIME(3) NOT NULL;
