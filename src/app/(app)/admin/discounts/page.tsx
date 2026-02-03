"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// MOCK DATA
const initialDiscounts = [
    { id: "1", nombre: "INAPAM / Tercera Edad", porcentaje: 0.50, activo: true },
    { id: "2", nombre: "Pago Enero (Pronto Pago)", porcentaje: 0.15, activo: true },
    { id: "3", nombre: "Pago Febrero", porcentaje: 0.10, activo: false },
];

export default function DiscountsPage() {
    const [discounts, setDiscounts] = useState(initialDiscounts);

    return (
        <div className="container py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestión de Descuentos</h1>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Nuevo Descuento</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Nuevo Descuento</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Nombre</Label>
                                <Input className="col-span-3" placeholder="Ej. INAPAM" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Porcentaje (0-1)</Label>
                                <Input type="number" step="0.01" className="col-span-3" placeholder="0.50" />
                            </div>
                            <Button onClick={() => alert("Simulando creación...")}>Guardar</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Porcentaje</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {discounts.map((d) => (
                        <TableRow key={d.id}>
                            <TableCell className="font-medium">{d.nombre}</TableCell>
                            <TableCell>{(d.porcentaje * 100)}%</TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    <Switch checked={d.activo} onCheckedChange={() => { }} />
                                    <span>{d.activo ? "Activo" : "Inactivo"}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm">Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
