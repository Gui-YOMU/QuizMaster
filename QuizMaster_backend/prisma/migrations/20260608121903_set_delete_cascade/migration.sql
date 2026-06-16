-- DropForeignKey
ALTER TABLE `Answer` DROP FOREIGN KEY `Answer_id_question_fkey`;

-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_id_question_fkey`;

-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_id_quiz_fkey`;

-- DropForeignKey
ALTER TABLE `Quiz` DROP FOREIGN KEY `Quiz_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `Room` DROP FOREIGN KEY `Room_id_quiz_fkey`;

-- DropForeignKey
ALTER TABLE `Room` DROP FOREIGN KEY `Room_id_user_fkey`;

-- DropIndex
DROP INDEX `Answer_id_question_fkey` ON `answer`;

-- DropIndex
DROP INDEX `Item_id_question_fkey` ON `item`;

-- DropIndex
DROP INDEX `Question_id_quiz_fkey` ON `question`;

-- DropIndex
DROP INDEX `Quiz_id_user_fkey` ON `quiz`;

-- DropIndex
DROP INDEX `Room_id_quiz_fkey` ON `room`;

-- DropIndex
DROP INDEX `Room_id_user_fkey` ON `room`;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_id_question_fkey` FOREIGN KEY (`id_question`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_id_question_fkey` FOREIGN KEY (`id_question`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_id_quiz_fkey` FOREIGN KEY (`id_quiz`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_id_quiz_fkey` FOREIGN KEY (`id_quiz`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
