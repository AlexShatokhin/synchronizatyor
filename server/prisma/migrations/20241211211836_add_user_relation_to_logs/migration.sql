-- AlterTable
ALTER TABLE `logs` ADD COLUMN `user_id` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX `user_id` ON `logs`(`user_id`);

-- AddForeignKey
ALTER TABLE `logs` ADD CONSTRAINT `logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
