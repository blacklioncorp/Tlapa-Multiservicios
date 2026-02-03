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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Contributor, Property } from "@/lib/types";

const formSchema = z.object({
  contribuyenteId: z.string({ required_error: "Debes seleccionar un contribuyente." }),
  tipoRegistro: z.enum(["agua", "catastro"], { required_error: "Selecciona el tipo de registro." }),
  direccionTexto: z.string().min(5, { message: "La dirección es requerida." }),
  colonia: z.string().min(3, { message: "La colonia es requerida." }),
  referencias: z.string(),
});

// Extendemos el tipo Property para incluir tipoRegistro en el formulario, 
// aunque no sea parte del modelo Property base (sería parte del Servicio inicial)
type AddPropertyFormValues = Omit<Property, 'id' | 'status' | 'coordenadas' | 'municipio' | 'estado'> & {
  tipoRegistro: "agua" | "catastro";
};

type AddPropertyFormProps = {
  contributors: Contributor[];
  onSubmit: (data: AddPropertyFormValues) => void;
  onCancel: () => void;
};

export function AddPropertyForm({ contributors, onSubmit, onCancel }: AddPropertyFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      direccionTexto: "",
      colonia: "",
      referencias: "",
    },
  });

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    // Cast manual para asegurar el tipo, ya que zod valida el string
    onSubmit(values as AddPropertyFormValues);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tipoRegistro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Registro</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="agua">Agua Potable</SelectItem>
                    <SelectItem value="catastro">Catastro / Predial</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contribuyenteId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contribuyente</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Busca un contribuyente..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {contributors.map(c => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.nombre_completo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="direccionTexto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección Completa</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Calle Principal 123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="colonia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colonia</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Centro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referencias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referencias Adicionales</FormLabel>
              <FormControl>
                <Textarea placeholder="Ej. Casa de 2 pisos color azul, portón negro..." {...field} />
              </FormControl>
              <FormDescription>
                Detalles que ayuden a ubicar el inmueble.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button type="submit">Añadir Inmueble</Button>
        </div>
      </form>
    </Form>
  );
}
