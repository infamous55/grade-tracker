/*
  Warnings:

  - A unique constraint covering the columns `[number,letter,yearId]` on the table `Class` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Class_number_letter_yearId_key" ON "Class"("number", "letter", "yearId");
