/*
  Warnings:

  - You are about to drop the column `time` on the `match` table. All the data in the column will be lost.
  - You are about to drop the column `coverTeam` on the `teams` table. All the data in the column will be lost.
  - Added the required column `Rounded` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `awayTeamNameId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeTeamNameId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `season` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `GA` to the `Teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `GD` to the `Teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `GF` to the `Teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `draw` to the `Teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `form` to the `Teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lose` to the `Teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `played` to the `Teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points` to the `Teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `Teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `win` to the `Teams` table without a default value. This is not possible if the table is not empty.
  - Made the column `logoTeam` on table `teams` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `match` DROP COLUMN `time`,
    ADD COLUMN `Rounded` VARCHAR(191) NOT NULL,
    ADD COLUMN `awayTeamNameId` VARCHAR(191) NOT NULL,
    ADD COLUMN `homeTeamNameId` VARCHAR(191) NOT NULL,
    ADD COLUMN `season` INTEGER NOT NULL,
    ALTER COLUMN `homeTeamScore` DROP DEFAULT,
    ALTER COLUMN `awayTeamScore` DROP DEFAULT,
    ALTER COLUMN `date` DROP DEFAULT;

-- AlterTable
ALTER TABLE `teams` DROP COLUMN `coverTeam`,
    ADD COLUMN `GA` INTEGER NOT NULL,
    ADD COLUMN `GD` INTEGER NOT NULL,
    ADD COLUMN `GF` INTEGER NOT NULL,
    ADD COLUMN `draw` INTEGER NOT NULL,
    ADD COLUMN `form` VARCHAR(191) NOT NULL,
    ADD COLUMN `lose` INTEGER NOT NULL,
    ADD COLUMN `played` INTEGER NOT NULL,
    ADD COLUMN `points` INTEGER NOT NULL,
    ADD COLUMN `rank` INTEGER NOT NULL,
    ADD COLUMN `update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `win` INTEGER NOT NULL,
    MODIFY `logoTeam` VARCHAR(191) NOT NULL;
