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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { Contributor } from "@/lib/types";

const formSchema = z.object({
  nombre_completo: z.string().min(2, { message: "El nombre es requerido." }),
  rfc: z.string().length(10, { message: "El RFC debe tener 10 caracteres." }),
  telefono: z.string().length(10, { message: "El teléfono debe tener 10 dígitos." }),
  email: z.string().email({ message: "Por favor, introduce un correo válido." }),
});

type AddContributorFormProps = {
  onAddContributor: (data: Omit<Contributor, 'id' | 'fechaRegistro'>) => void;
};

export function AddContributorForm({ onAddContributor }: AddContributorFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre_completo: "",
      rfc: "",
      telefono: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddContributor(values);
    toast({
      title: "Contribuyente Añadido",
      description: "El nuevo contribuyente ha sido agregado exitosamente.",
    });
    form.reset();
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Nuevo Contribuyente</CardTitle>
          <CardDescription>Rellena los campos para añadir un nuevo contribuyente.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                control={form.control}
                name="nombre_completo"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                        <Input placeholder="Ej. Juan Pérez García" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="rfc"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>RFC (primeros 10 dígitos)</FormLabel>
                    <FormControl>
                        <Input placeholder="Ej. PEGA800101" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                        <Input type="tel" placeholder="Ej. 7571234567" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="Ej. juan.perez@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full">Añadir Contribuyente</Button>
            </form>
            </Form>
        </CardContent>
      </Card>
  );
}
