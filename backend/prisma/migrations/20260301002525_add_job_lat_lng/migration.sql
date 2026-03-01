-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "skills" TEXT[];
