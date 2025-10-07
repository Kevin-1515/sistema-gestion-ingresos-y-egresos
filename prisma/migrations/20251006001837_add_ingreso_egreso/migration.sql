/*
  Warnings:

  - You are about to drop the `movement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."movement" DROP CONSTRAINT "movement_userId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'USER';

-- DropTable
DROP TABLE "public"."movement";

-- DropEnum
DROP TYPE "public"."MovementType";

-- CreateTable
CREATE TABLE "ingreso" (
    "id" TEXT NOT NULL,
    "concepto" TEXT NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ingreso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "egreso" (
    "id" TEXT NOT NULL,
    "concepto" TEXT NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "egreso_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingreso" ADD CONSTRAINT "ingreso_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "egreso" ADD CONSTRAINT "egreso_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
