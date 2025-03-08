-- AlterTable
ALTER TABLE "events" ALTER COLUMN "prerequisites" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "general_rules" SET DEFAULT ARRAY[]::TEXT[];
