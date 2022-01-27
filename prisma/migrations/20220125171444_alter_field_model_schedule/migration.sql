/*
  Warnings:

  - You are about to drop the column `end_data` on the `schedule` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Automobile_brandId_fkey` ON `automobile`;

-- DropIndex
DROP INDEX `Automobile_carModelId_fkey` ON `automobile`;

-- DropIndex
DROP INDEX `Schedule_autoId_fkey` ON `schedule`;

-- AlterTable
ALTER TABLE `schedule` DROP COLUMN `end_data`,
    ADD COLUMN `end_date` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Automobile` ADD CONSTRAINT `Automobile_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Automobile` ADD CONSTRAINT `Automobile_carModelId_fkey` FOREIGN KEY (`carModelId`) REFERENCES `CarModel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_autoId_fkey` FOREIGN KEY (`autoId`) REFERENCES `Automobile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
