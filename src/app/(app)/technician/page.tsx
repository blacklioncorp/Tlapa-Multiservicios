import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  mockProperties,
  mockServices,
  mockPayments,
} from "@/lib/data";
import { getPaymentStatus } from "@/lib/helpers";
import type { PaymentStatus } from "@/lib/types";
import { ManagementMap } from "@/components/map/management-map";

export default function TechnicianPage() {
    const properties = mockProperties;
    const services = mockServices;
    const payments = mockPayments;

    const propertiesWithStatus = properties.map(prop => {
        const propServices = services.filter(s => s.inmuebleId === prop.id);
        let worstStatus: PaymentStatus = 'green';
    
        for (const service of propServices) {
            const status = getPaymentStatus(service, payments);
            if (status === 'red') {
                worstStatus = 'red';
                break;
            }
            if (status === 'orange') {
                worstStatus = 'orange';
            }
        }
        return {...prop, paymentStatus: worstStatus};
    });

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="font-headline">Mapa de Técnico</CardTitle>
                <CardDescription>Verifique y actualice la ubicación de los inmuebles.</CardDescription>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo Inmueble
            </Button>
        </CardHeader>
        <CardContent>
             <ManagementMap properties={propertiesWithStatus} />
        </CardContent>
      </Card>
    </div>
  );
}
