/*
  Warnings:

  - You are about to drop the `matchs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `matchs`;

-- CreateTable
CREATE TABLE `Match` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `home` VARCHAR(191) NOT NULL,
    `away` VARCHAR(191) NOT NULL,
    `season` INTEGER NOT NULL,
    `Rounded` VARCHAR(191) NOT NULL,
    `homeScore` INTEGER NOT NULL,
    `awayScore` INTEGER NOT NULL,
    `date` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
