/*
  Warnings:

  - You are about to drop the column `done` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `task` table. All the data in the column will be lost.
  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_userId_fkey`;

-- DropIndex
DROP INDEX `Task_userId_fkey` ON `task`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `done`,
    DROP COLUMN `text`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
