/*
  Warnings:

  - You are about to drop the column `catogory` on the `events` table. All the data in the column will be lost.
  - Added the required column `category` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "catogory",
ADD COLUMN     "category" TEXT NOT NULL;
