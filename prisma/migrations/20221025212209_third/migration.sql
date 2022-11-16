/*
  Warnings:

  - A unique constraint covering the columns `[filename]` on the table `HeartRate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `filename` to the `HeartRate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HeartRate" ADD COLUMN     "filename" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "HeartRate_filename_key" ON "HeartRate"("filename");
