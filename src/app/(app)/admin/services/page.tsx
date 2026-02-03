"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// MOCK DATA for now, until we connect to Server Actions
const initialServices = [
    { id: "1", nombre_servicio: "Agua Potable Doméstica", costo_base: 150.00, tipo: "MENSUAL" },
    { id: "2", nombre_servicio: "Predial Urbano", costo_base: 0.00, tipo: "ANUAL" },
];

export default function ServicesPage() {
    const [services, setServices] = useState(initialServices);

    return (
        <div className="container py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Catálogo de Servicios</h1>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Nuevo Servicio</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Crear Nuevo Servicio</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Nombre</Label>
                                <Input id="name" className="col-span-3" placeholder="Ej. Agua Comercial" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="cost" className="text-right">Costo Base</Label>
                                <Input id="cost" type="number" className="col-span-3" placeholder="0.00" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Cobro</Label>
                                <Select defaultValue="MENSUAL">
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="MENSUAL">Mensual</SelectItem>
                                        <SelectItem value="ANUAL">Anual</SelectItem>
                                        <SelectItem value="UNICO">Único</SelectItem>
                                    </SelectContent>
                                </Select>
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
                        <TableHead>Costo Base</TableHead>
                        <TableHead>Tipo Cobro</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {services.map((s) => (
                        <TableRow key={s.id}>
                            <TableCell>{s.nombre_servicio}</TableCell>
                            <TableCell>${s.costo_base.toFixed(2)}</TableCell>
                            <TableCell>{s.tipo}</TableCell>
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
