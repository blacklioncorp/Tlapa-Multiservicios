"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import type { Contributor } from "@/lib/types"

type ContributorsTableProps = {
  contributors: Contributor[];
};

export function ContributorsTable({ contributors }: ContributorsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContributors = contributors.filter(contributor =>
    contributor.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contributor.rfc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
        <Input 
            placeholder="Buscar por nombre o RFC..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
        />
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre Completo</TableHead>
                        <TableHead>RFC</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredContributors.length > 0 ? (
                        filteredContributors.map((contributor) => (
                            <TableRow key={contributor.id}>
                                <TableCell className="font-medium">{contributor.nombre_completo}</TableCell>
                                <TableCell>{contributor.rfc}</TableCell>
                                <TableCell>{contributor.telefono}</TableCell>
                                <TableCell>{contributor.email}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                No se encontraron resultados.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    </div>
  );
}
