-- Adding very simple role-based access control with only one role per user
-- CreateEnum
CREATE TYPE "Role" AS ENUM(
  'ADMIN',
  'CUSTOMER'
);

-- AlterTable
ALTER TABLE "user"
  ADD COLUMN "role" "Role" NOT NULL DEFAULT 'CUSTOMER';

