/*
  Warnings:

  - A unique constraint covering the columns `[renavam]` on the table `Automobile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Automobile_brandId_fkey` ON `automobile`;

-- DropIndex
DROP INDEX `Automobile_carModelId_fkey` ON `automobile`;

-- CreateIndex
CREATE UNIQUE INDEX `Automobile_renavam_key` ON `Automobile`(`renavam`);

-- AddForeignKey
ALTER TABLE `Automobile` ADD CONSTRAINT `Automobile_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Automobile` ADD CONSTRAINT `Automobile_carModelId_fkey` FOREIGN KEY (`carModelId`) REFERENCES `CarModel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
