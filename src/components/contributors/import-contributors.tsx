"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload } from 'lucide-react';
import type { Contributor } from '@/lib/types';

type ImportContributorsProps = {
    onImport: (contributors: Contributor[]) => void;
};

export function ImportContributors({ onImport }: ImportContributorsProps) {
    const { toast } = useToast();
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleImport = () => {
        if (!file) {
            toast({
                variant: 'destructive',
                title: "Error",
                description: "Por favor, selecciona un archivo primero.",
            });
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json<any>(worksheet);

                const newContributors = json.map((row, index) => ({
                    id: `imported-${Date.now()}-${index}`,
                    nombre_completo: row['nombre_completo'] || '',
                    rfc: row['rfc'] || '',
                    telefono: String(row['telefono'] || ''),
                    email: row['email'] || '',
                    fechaRegistro: new Date().toISOString().split('T')[0],
                }));

                onImport(newContributors);

                toast({
                    title: "Importación Exitosa",
                    description: `Se han importado ${newContributors.length} contribuyentes.`,
                });
            } catch (error) {
                 toast({
                    variant: 'destructive',
                    title: "Error de Importación",
                    description: "El archivo no tiene el formato correcto. Asegúrate que las columnas son: nombre_completo, rfc, telefono, email.",
                });
            }

        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-lg'>Importar desde Excel</CardTitle>
                <CardDescription>Sube un archivo .xlsx o .csv para añadir contribuyentes masivamente.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="excel-file">Archivo Excel</Label>
                    <Input id="excel-file" type="file" onChange={handleFileChange} accept=".xlsx, .xls, .csv" />
                </div>
                <Button onClick={handleImport} className='w-full'>
                    <Upload className="mr-2 h-4 w-4" />
                    Importar Contribuyentes
                </Button>
                <p className='text-xs text-muted-foreground pt-2'>
                    Asegúrate que tu archivo tiene las columnas: <strong>nombre_completo</strong>, <strong>rfc</strong>, <strong>telefono</strong>, y <strong>email</strong>.
                </p>
            </CardContent>
        </Card>
    );
}
