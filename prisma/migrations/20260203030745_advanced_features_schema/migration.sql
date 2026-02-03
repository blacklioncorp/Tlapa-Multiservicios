-- AlterTable
ALTER TABLE "cuentas_servicio" ADD COLUMN     "fecha_contrato" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tarifa_personalizada" DECIMAL(10,2),
ADD COLUMN     "tipo_contrato" TEXT DEFAULT 'ESTANDAR';

-- AlterTable
ALTER TABLE "servicios_catalogo" ADD COLUMN     "costo_base" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "requiere_direccion" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "tipo_cobro" TEXT NOT NULL DEFAULT 'MENSUAL';

-- CreateTable
CREATE TABLE "descuentos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "porcentaje" DOUBLE PRECISION NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "reglas" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "descuentos_pkey" PRIMARY KEY ("id")
);
