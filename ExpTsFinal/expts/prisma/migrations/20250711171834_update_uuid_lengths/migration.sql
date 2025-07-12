/*
  Warnings:

  - The primary key for the `game_sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `game_sessions` table. The data in that column could be lost. The data in that column will be cast from `Char(40)` to `Char(36)`.
  - You are about to alter the column `user_id` on the `game_sessions` table. The data in that column could be lost. The data in that column will be cast from `Char(40)` to `Char(36)`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Char(40)` to `Char(36)`.

*/
-- DropForeignKey
ALTER TABLE `game_sessions` DROP FOREIGN KEY `game_sessions_user_id_fkey`;

-- AlterTable
ALTER TABLE `game_sessions` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    MODIFY `user_id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `game_sessions` ADD CONSTRAINT `game_sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
