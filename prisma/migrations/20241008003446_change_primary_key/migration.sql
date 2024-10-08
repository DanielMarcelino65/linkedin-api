/*
  Warnings:

  - The primary key for the `benefits` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "benefits" DROP CONSTRAINT "benefits_pkey",
ADD CONSTRAINT "benefits_pkey" PRIMARY KEY ("job_id", "type");
