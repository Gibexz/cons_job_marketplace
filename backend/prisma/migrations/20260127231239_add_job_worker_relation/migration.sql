-- CreateEnum
CREATE TYPE "JobWorkerStatus" AS ENUM ('INVITED', 'APPLIED', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "JobWorker" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "status" "JobWorkerStatus" NOT NULL DEFAULT 'INVITED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobWorker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobWorker_jobId_workerId_key" ON "JobWorker"("jobId", "workerId");

-- AddForeignKey
ALTER TABLE "JobWorker" ADD CONSTRAINT "JobWorker_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobWorker" ADD CONSTRAINT "JobWorker_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "WorkerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
