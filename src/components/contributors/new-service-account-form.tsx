"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";
import { GeolocationButton } from "@/components/ui/geolocation-button";
import { useState } from "react";
// import { ManagementMap } from "@/components/map/management-map"; // We could reuse this if needed for visual confirmation

const formSchema = z.object({
    contribuyenteId: z.string().min(1, "Selecciona un contribuyente"), // In a real flow, maybe we create one or select
    servicioId: z.string().min(1, "Selecciona un servicio"),
    alias_ubicacion: z.string().optional(),
    direccion_completa: z.string().min(5, "La dirección es requerida"),
    referencia_interna: z.string().optional(),
    lat: z.number(),
    lng: z.number(),
    estatus_pago: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function NewServiceAccountForm() {
    const [loading, setLoading] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            alias_ubicacion: "",
            direccion_completa: "",
            referencia_interna: "",
            estatus_pago: "al_corriente",
            lat: 0,
            lng: 0,
        },
    });

    const handleAddressSelect = (address: string, lat: number, lng: number) => {
        form.setValue("direccion_completa", address);
        form.setValue("lat", lat);
        form.setValue("lng", lng);
    };

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        console.log("Submitting:", data);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        alert("Cuenta de servicio guardada (Simulación)");
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Nueva Cuenta de Servicio</CardTitle>
                <CardDescription>
                    Registra una nueva ubicación de servicio para un contribuyente.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                            control={form.control}
                            name="contribuyenteId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contribuyente (ID Simulado)</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="C1">Juan Perez</SelectItem>
                                            <SelectItem value="C2">Maria Lopez</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="servicioId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de Servicio</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="agua">Agua Potable</SelectItem>
                                            <SelectItem value="catastro">Catastro</SelectItem>
                                            <SelectItem value="panteones">Panteones</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-2">
                            <FormLabel>Dirección / Ubicación</FormLabel>
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <AddressAutocomplete
                                        onSelect={handleAddressSelect}
                                        defaultValue={form.watch("direccion_completa")}
                                    />
                                </div>
                                <GeolocationButton onLocationFound={handleAddressSelect} />
                            </div>
                            <FormDescription>
                                Usa el buscador o el botón de ubicación para llenar automáticamente.
                            </FormDescription>
                            <input type="hidden" {...form.register("direccion_completa")} />
                            {form.formState.errors.direccion_completa && (
                                <p className="text-sm font-medium text-destructive">{form.formState.errors.direccion_completa.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="lat"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Latitud</FormLabel>
                                        <FormControl>
                                            <Input {...field} readOnly />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lng"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Longitud</FormLabel>
                                        <FormControl>
                                            <Input {...field} readOnly />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="alias_ubicacion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alias (Opcional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ej. Casa de campo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="referencia_interna"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Referencia Interna</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ej. Medidor #12345" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Guardando..." : "Registrar Cuenta de Servicio"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
