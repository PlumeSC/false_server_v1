/*
  Warnings:

  - You are about to drop the `match` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `match` DROP FOREIGN KEY `Match_teamsId_fkey`;

-- DropTable
DROP TABLE `match`;

-- CreateTable
CREATE TABLE `Matchs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `season` INTEGER NOT NULL,
    `Rounded` VARCHAR(191) NOT NULL,
    `homeScore` INTEGER NOT NULL,
    `awayScore` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `homeTeamId` INTEGER NOT NULL,
    `awayTeamId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Matchs` ADD CONSTRAINT `Matchs_homeTeamId_fkey` FOREIGN KEY (`homeTeamId`) REFERENCES `Teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matchs` ADD CONSTRAINT `Matchs_awayTeamId_fkey` FOREIGN KEY (`awayTeamId`) REFERENCES `Teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
