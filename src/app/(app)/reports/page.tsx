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
import { mockContributors, mockProperties, mockPayments } from "@/lib/data";


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
          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button variant="outline" className="w-full sm:w-auto">
                <FileDown className="mr-2 h-4 w-4" />
                Exportar a Excel
            </Button>
            <Button className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Generar PDF
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>Vista Previa de Reporte de Pagos</CardTitle>
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="hidden sm:table-cell">Folio</TableHead>
                    <TableHead>Contribuyente</TableHead>
                    <TableHead className="hidden md:table-cell">Concepto</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="hidden md:table-cell">Fecha Pago</TableHead>
                    <TableHead>Estado</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {mockPayments.slice(0, 5).map((payment) => {
                    const contributor = mockContributors.find(c => c.id === payment.contribuyenteId);
                    return (
                    <TableRow key={payment.id}>
                        <TableCell className="hidden sm:table-cell font-medium">{payment.folio}</TableCell>
                        <TableCell>
                            <div className="font-medium">{contributor?.nombre_completo || 'N/A'}</div>
                            <div className="text-sm text-muted-foreground md:hidden">
                                {payment.fechaPago}
                            </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{payment.concepto}</TableCell>
                        <TableCell className="text-right">${payment.total.toFixed(2)}</TableCell>
                        <TableCell className="hidden md:table-cell">{payment.fechaPago}</TableCell>
                        <TableCell><Badge variant="default">{payment.estadoRecibo}</Badge></TableCell>
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
