/*
  Warnings:

  - A unique constraint covering the columns `[company]` on the table `Job` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Job_company_key" ON "Job"("company");
