"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { ManagementMap } from "@/components/map/management-map";
import { AddPropertyForm } from "./add-property-form";
import type { Property, PaymentStatus, Contributor, GeoPoint } from "@/lib/types";
import { useToast } from '@/hooks/use-toast';

type TechnicianClientProps = {
    initialProperties: (Property & { paymentStatus: PaymentStatus })[];
    contributors: Contributor[];
};

export function TechnicianClient({ initialProperties, contributors }: TechnicianClientProps) {
    const [properties, setProperties] = useState(initialProperties);
    const [isAddMode, setIsAddMode] = useState(false);
    const [newPropertyCoords, setNewPropertyCoords] = useState<GeoPoint | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        if (!isAddMode) return;

        const lat = e.latLng?.lat();
        const lng = e.latLng?.lng();

        if (lat && lng) {
            setNewPropertyCoords({ lat, lng });
            setIsDialogOpen(true);
        }
    };
    
    const handleAddProperty = (data: Omit<Property, 'id' | 'status' | 'coordenadas' | 'municipio' | 'estado'>) => {
        if (!newPropertyCoords) return;

        const newProperty: Property & { paymentStatus: PaymentStatus } = {
            ...data,
            id: `P${properties.length + 1}`,
            coordenadas: newPropertyCoords,
            status: 'pending',
            paymentStatus: 'green', // Default for new property
            municipio: 'Tlapa de Comonfort',
            estado: 'Guerrero'
        };

        setProperties(prev => [...prev, newProperty]);
        
        toast({
            title: "Inmueble Añadido",
            description: `El inmueble en "${newProperty.direccionTexto}" ha sido agregado.`,
        });

        // Reset state
        setIsDialogOpen(false);
        setIsAddMode(false);
        setNewPropertyCoords(null);
    };

    const handleOpenDialog = () => {
        setIsAddMode(true);
        toast({
            title: "Modo de Adición Activado",
            description: "Haz clic en el mapa para ubicar el nuevo inmueble.",
        });
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setIsAddMode(false);
        setNewPropertyCoords(null);
    }

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline">Mapa de Técnico</CardTitle>
                        <CardDescription>Verifique y actualice la ubicación de los inmuebles.</CardDescription>
                    </div>
                    <Button onClick={handleOpenDialog}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nuevo Inmueble
                    </Button>
                </CardHeader>
                <CardContent>
                    <ManagementMap 
                        properties={properties} 
                        onMapClick={isAddMode ? handleMapClick : undefined}
                        newPropertyLocation={newPropertyCoords}
                    />
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Añadir Nuevo Inmueble</DialogTitle>
                        <DialogDescription>
                            Completa los detalles para el nuevo inmueble. La ubicación se ha fijado desde el mapa.
                        </DialogDescription>
                    </DialogHeader>
                    {newPropertyCoords && (
                        <AddPropertyForm
                            contributors={contributors}
                            onSubmit={handleAddProperty}
                            onCancel={handleDialogClose}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
