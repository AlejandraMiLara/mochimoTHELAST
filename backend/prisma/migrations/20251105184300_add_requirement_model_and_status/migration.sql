-- CreateEnum
CREATE TYPE "RequirementStatus" AS ENUM ('PENDING', 'SUBMITTED', 'APPROVED', 'REVISION');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ProjectStatus" ADD VALUE 'REVIEW';
ALTER TYPE "ProjectStatus" ADD VALUE 'APPROVED';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "Requirement" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "RequirementStatus" NOT NULL DEFAULT 'PENDING',
    "revisionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Requirement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
