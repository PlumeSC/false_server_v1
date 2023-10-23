/*
  Warnings:

  - You are about to drop the column `newsImg` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `newsTitle` on the `news` table. All the data in the column will be lost.
  - You are about to drop the `newscontent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `message` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `newscontent` DROP FOREIGN KEY `NewsContent_newsId_fkey`;

-- AlterTable
ALTER TABLE `news` DROP COLUMN `newsImg`,
    DROP COLUMN `newsTitle`,
    ADD COLUMN `img` VARCHAR(191) NULL,
    ADD COLUMN `message` VARCHAR(12000) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `newscontent`;
