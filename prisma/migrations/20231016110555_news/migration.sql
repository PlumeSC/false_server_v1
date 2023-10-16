/*
  Warnings:

  - You are about to alter the column `team` on the `news` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - You are about to alter the column `team` on the `teams` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `team` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `news` MODIFY `team` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `teams` MODIFY `team` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `team` VARCHAR(191) NOT NULL;
