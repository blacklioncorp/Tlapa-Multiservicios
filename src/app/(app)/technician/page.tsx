import { TechnicianClient } from "@/components/technician/technician-client";
import {
  mockProperties,
  mockServices,
  mockPayments,
  mockContributors,
} from "@/lib/data";
import { getPaymentStatus } from "@/lib/helpers";
import type { PaymentStatus } from "@/lib/types";

export default function TechnicianPage() {
    const properties = mockProperties;
    const services = mockServices;
    const payments = mockPayments;
    const contributors = mockContributors;

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
    <TechnicianClient initialProperties={propertiesWithStatus} contributors={contributors} />
  );
}
