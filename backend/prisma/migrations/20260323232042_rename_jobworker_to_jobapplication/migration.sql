/*
  Warnings:

  - You are about to drop the `JobWorker` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "JobApplicationStatus" AS ENUM ('INVITED', 'APPLIED', 'ACCEPTED', 'REJECTED', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "JobWorker" DROP CONSTRAINT "JobWorker_jobId_fkey";

-- DropForeignKey
ALTER TABLE "JobWorker" DROP CONSTRAINT "JobWorker_workerId_fkey";

-- DropTable
DROP TABLE "JobWorker";

-- DropEnum
DROP TYPE "JobWorkerStatus";

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "status" "JobApplicationStatus" NOT NULL DEFAULT 'INVITED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_jobId_workerId_key" ON "JobApplication"("jobId", "workerId");

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "WorkerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
