import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { mockContributors, mockProperties, mockServices } from "@/lib/data";


export default function ReportsPage() {
  const colonias = [...new Set(mockProperties.map(p => p.colonia))];

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generador de Reportes</CardTitle>
          <CardDescription>Filtre y exporte los datos del sistema.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="grid gap-2">
                <Label htmlFor="colonia">Colonia</Label>
                <Select>
                    <SelectTrigger id="colonia">
                        <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                        {colonias.map(colonia => (
                            <SelectItem key={colonia} value={colonia.toLowerCase().replace(/\s/g, '-')}>{colonia}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="status">Estado de Pago</Label>
                <Select>
                    <SelectTrigger id="status">
                        <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="green">Al Corriente</SelectItem>
                        <SelectItem value="orange">Atrasado</SelectItem>
                        <SelectItem value="red">En Mora</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="service">Tipo de Servicio</Label>
                <Select>
                    <SelectTrigger id="service">
                        <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="agua">Agua</SelectItem>
                        <SelectItem value="predial">Predial</SelectItem>
                        <SelectItem value="catastro">Catastro</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="date-range">Rango de Fechas</Label>
                <Input id="date-range" type="date" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Exportar a Excel
            </Button>
            <Button>
                <Download className="mr-2 h-4 w-4" />
                Generar PDF
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>Vista Previa de Reporte</CardTitle>
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Contribuyente</TableHead>
                <TableHead>Inmueble</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Estado</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">{mockContributors[0].nombre_completo}</TableCell>
                    <TableCell>{mockProperties[0].direccionTexto}</TableCell>
                    <TableCell>{mockServices[0].tipo}</TableCell>
                    <TableCell><Badge className="bg-green-500">Al corriente</Badge></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">{mockContributors[1].nombre_completo}</TableCell>
                    <TableCell>{mockProperties[1].direccionTexto}</TableCell>
                    <TableCell>{mockServices[2].tipo}</TableCell>
                    <TableCell><Badge variant="destructive">En Mora</Badge></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">{mockContributors[2].nombre_completo}</TableCell>
                    <TableCell>{mockProperties[2].direccionTexto}</TableCell>
                    <TableCell>{mockServices[4].tipo}</TableCell>
                    <TableCell><Badge className="bg-orange-500">Atrasado</Badge></TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
