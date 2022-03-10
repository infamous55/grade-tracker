/*
  Warnings:

  - A unique constraint covering the columns `[startDate,endDate]` on the table `Year` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Year_startDate_endDate_key" ON "Year"("startDate", "endDate");
