/*
  Warnings:

  - Added the required column `RazaoSocial` to the `EmpresasMedicas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmpresasMedicas" ADD COLUMN     "RazaoSocial" TEXT NOT NULL;
