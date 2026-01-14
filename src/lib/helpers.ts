import { differenceInCalendarMonths } from 'date-fns';
import type { Payment, Service, PaymentStatus } from './types';

export function getPaymentStatus(
  service: Service,
  payments: Payment[]
): PaymentStatus {
  const servicePayments = payments
    .filter((p) => p.servicioId === service.id)
    .sort((a, b) => new Date(b.periodoCubierto).getTime() - new Date(a.periodoCubierto).getTime());

  if (servicePayments.length === 0) {
    return 'red';
  }

  const lastPayment = servicePayments[0];
  const lastPaymentPeriod = new Date(`${lastPayment.periodoCubierto}-02`); // Use day 2 to avoid timezone issues

  const today = new Date();
  
  const monthsDiff = differenceInCalendarMonths(today, lastPaymentPeriod);

  if (monthsDiff <= 1) {
    return 'green';
  }
  if (monthsDiff === 2) {
    return 'orange';
  }
  return 'red';
}
