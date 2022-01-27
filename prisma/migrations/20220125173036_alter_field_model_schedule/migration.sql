-- DropIndex
DROP INDEX `Automobile_brandId_fkey` ON `automobile`;

-- DropIndex
DROP INDEX `Automobile_carModelId_fkey` ON `automobile`;

-- DropIndex
DROP INDEX `Schedule_autoId_fkey` ON `schedule`;

-- AlterTable
ALTER TABLE `automobile` MODIFY `year` DATE NULL;

-- AlterTable
ALTER TABLE `schedule` MODIFY `start_date` DATE NOT NULL,
    MODIFY `end_date` DATE NOT NULL;

-- AddForeignKey
ALTER TABLE `Automobile` ADD CONSTRAINT `Automobile_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Automobile` ADD CONSTRAINT `Automobile_carModelId_fkey` FOREIGN KEY (`carModelId`) REFERENCES `CarModel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_autoId_fkey` FOREIGN KEY (`autoId`) REFERENCES `Automobile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
