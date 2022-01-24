-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `cpf` CHAR(11) NULL,
    `cep` CHAR(8) NULL,
    `phone` CHAR(8) NULL,
    `cellPhone` CHAR(9) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
