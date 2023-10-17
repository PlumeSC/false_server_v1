/*
  Warnings:

  - You are about to drop the `newscontnt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `newscontnt` DROP FOREIGN KEY `NewsContnt_newsId_fkey`;

-- DropTable
DROP TABLE `newscontnt`;

-- CreateTable
CREATE TABLE `NewsContent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `indexContent` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `newsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NewsContent` ADD CONSTRAINT `NewsContent_newsId_fkey` FOREIGN KEY (`newsId`) REFERENCES `News`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
