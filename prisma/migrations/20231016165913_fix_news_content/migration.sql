/*
  Warnings:

  - You are about to drop the column `newsCont` on the `news` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `news` DROP COLUMN `newsCont`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `isVip` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `NewsContnt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(191) NOT NULL,
    `newsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NewsContnt` ADD CONSTRAINT `NewsContnt_newsId_fkey` FOREIGN KEY (`newsId`) REFERENCES `News`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
