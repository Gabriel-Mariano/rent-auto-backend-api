-- CreateTable
CREATE TABLE `Automobile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `describe` VARCHAR(255) NULL,
    `year` DATETIME(3) NULL,
    `fuel` VARCHAR(191) NOT NULL,
    `exchange` ENUM('Manual', 'Auto') NOT NULL DEFAULT 'Manual',
    `km` DECIMAL(9, 2) NOT NULL,
    `renavam` CHAR(11) NOT NULL,
    `chassis` CHAR(17) NOT NULL,
    `licensePlate` CHAR(7) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
