-- DropIndex
DROP INDEX `Automobile_brandId_fkey` ON `automobile`;

-- DropIndex
DROP INDEX `Automobile_carModelId_fkey` ON `automobile`;

-- CreateTable
CREATE TABLE `Schedule` (
    `userId` INTEGER NOT NULL,
    `autoId` INTEGER NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_data` DATETIME(3) NOT NULL,
    `price` DECIMAL(9, 2) NOT NULL,

    PRIMARY KEY (`userId`, `autoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Automobile` ADD CONSTRAINT `Automobile_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Automobile` ADD CONSTRAINT `Automobile_carModelId_fkey` FOREIGN KEY (`carModelId`) REFERENCES `CarModel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_autoId_fkey` FOREIGN KEY (`autoId`) REFERENCES `Automobile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
