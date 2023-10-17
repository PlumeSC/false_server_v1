/*
  Warnings:

  - Added the required column `indexContent` to the `NewsContnt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `newscontnt` ADD COLUMN `indexContent` INTEGER NOT NULL;
