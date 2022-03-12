/*
  Warnings:

  - A unique constraint covering the columns `[number,yearId]` on the table `Semester` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `Semester` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Semester" ADD COLUMN     "number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Semester_number_yearId_key" ON "Semester"("number", "yearId");
