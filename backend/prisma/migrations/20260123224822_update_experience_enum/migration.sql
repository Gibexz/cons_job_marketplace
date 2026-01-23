/*
  Warnings:

  - Changed the type of `experience` on the `WorkerProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'PROFESSIONAL', 'EXPERT');

-- AlterTable
ALTER TABLE "WorkerProfile" DROP COLUMN "experience",
ADD COLUMN     "experience" "ExperienceLevel" NOT NULL;
