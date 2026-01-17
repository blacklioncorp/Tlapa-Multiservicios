import {
  mockContributors,
  mockProperties,
  mockServices,
  mockPayments,
} from "@/lib/data";
import { getPaymentStatus } from "@/lib/helpers";
import type { PaymentStatus } from "@/lib/types";
import { isThisMonth, isThisYear, parseISO, subMonths } from 'date-fns';
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export default async function DashboardPage() {
  const contributors = mockContributors;
  const properties = mockProperties;
  const services = mockServices;
  const payments = mockPayments;

  const serviceStatuses = services.map(service => ({
    serviceId: service.id,
    status: getPaymentStatus(service, payments),
  }));

  const statusCounts = serviceStatuses.reduce((acc, { status }) => {
    acc[status]++;
    return acc;
  }, { green: 0, orange: 0, red: 0 } as Record<PaymentStatus, number>);

  const totalServices = services.length;
  const greenPercentage = totalServices > 0 ? (statusCounts.green / totalServices) * 100 : 0;

  const monthlyRevenue = payments.reduce((acc, payment) => {
    if (isThisMonth(parseISO(payment.fechaPago))) {
      return acc + payment.total;
    }
    return acc;
  }, 0);

  const yearlyRevenue = payments.reduce((acc, payment) => {
    if (isThisYear(parseISO(payment.fechaPago))) {
        return acc + payment.total;
    }
    return acc;
  }, 0);

  const revenueByMonth = Array.from({ length: 12 }, (_, i) => {
    const month = subMonths(new Date(), i);
    const monthKey = month.toLocaleString('default', { month: 'short' });
    return { month: monthKey, total: 0 };
  }).reverse();

  payments.forEach(p => {
    const paymentMonth = parseISO(p.fechaPago).toLocaleString('default', { month: 'short' });
    const target = revenueByMonth.find(m => m.month === paymentMonth);
    if(target) {
        target.total += p.total;
    }
  });


  const servicesByType = services.reduce((acc, service) => {
    acc[service.tipo] = (acc[service.tipo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const servicesChartData = Object.entries(servicesByType).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));
  
  const kpis = {
    totalContributors: contributors.length,
    totalProperties: properties.length,
    currentServicesPercentage: greenPercentage,
    criticalServices: statusCounts.red,
    monthlyRevenue,
    yearlyRevenue,
  };

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
       <DashboardClient 
        kpis={kpis}
        revenueChartData={revenueByMonth}
        servicesChartData={servicesChartData}
        properties={propertiesWithStatus}
       />
    </div>
  );
}
