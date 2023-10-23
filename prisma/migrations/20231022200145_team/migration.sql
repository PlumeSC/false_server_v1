/*
  Warnings:

  - You are about to drop the column `away` on the `match` table. All the data in the column will be lost.
  - You are about to drop the column `home` on the `match` table. All the data in the column will be lost.
  - Added the required column `awayTeamId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeTeamId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `match` DROP COLUMN `away`,
    DROP COLUMN `home`,
    ADD COLUMN `awayTeamId` INTEGER NOT NULL,
    ADD COLUMN `homeTeamId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Match` ADD CONSTRAINT `Match_homeTeamId_fkey` FOREIGN KEY (`homeTeamId`) REFERENCES `Teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Match` ADD CONSTRAINT `Match_awayTeamId_fkey` FOREIGN KEY (`awayTeamId`) REFERENCES `Teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
