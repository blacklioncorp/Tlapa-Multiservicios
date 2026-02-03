-- CreateTable
CREATE TABLE "AppUser" (
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "avatarUrl" TEXT,

    CONSTRAINT "AppUser_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "contribuyentes" (
    "id" TEXT NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "rfc" TEXT,
    "email" TEXT,
    "telefono" TEXT,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contribuyentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicios_catalogo" (
    "id" TEXT NOT NULL,
    "nombre_servicio" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "servicios_catalogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cuentas_servicio" (
    "id" TEXT NOT NULL,
    "contribuyenteId" TEXT NOT NULL,
    "servicioId" TEXT,
    "alias_ubicacion" TEXT,
    "direccion_completa" TEXT,
    "referencia_interna" TEXT,
    "lat" DECIMAL(10,8),
    "lng" DECIMAL(11,8),
    "metadata" JSONB DEFAULT '{"control_interno": {"activo": false, "monto_adeudo": 0}}',
    "estatus_pago" TEXT DEFAULT 'al_corriente',

    CONSTRAINT "cuentas_servicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "folio" INTEGER NOT NULL,
    "caja" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "programa" TEXT NOT NULL,
    "clave" TEXT,
    "estadoRecibo" TEXT NOT NULL,
    "formaPago" TEXT NOT NULL,
    "concepto" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "cuentaId" TEXT,
    "contribuyenteId" TEXT,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppUser_email_key" ON "AppUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contribuyentes_rfc_key" ON "contribuyentes"("rfc");

-- AddForeignKey
ALTER TABLE "cuentas_servicio" ADD CONSTRAINT "cuentas_servicio_contribuyenteId_fkey" FOREIGN KEY ("contribuyenteId") REFERENCES "contribuyentes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cuentas_servicio" ADD CONSTRAINT "cuentas_servicio_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "servicios_catalogo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_cuentaId_fkey" FOREIGN KEY ("cuentaId") REFERENCES "cuentas_servicio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_contribuyenteId_fkey" FOREIGN KEY ("contribuyenteId") REFERENCES "contribuyentes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
