import type { Contributor, Property, Service, Payment, AppUser } from './types';
import { subMonths, format } from 'date-fns';

const today = new Date();

export const mockUsers: AppUser[] = [
  {
    uid: '1',
    email: 'admin@tlapa.gob.mx',
    rol: 'admin',
    nombre: 'Admin General',
    avatarUrl: 'https://picsum.photos/seed/user1/100/100'
  },
  {
    uid: '2',
    email: 'tech@tlapa.gob.mx',
    rol: 'tecnico',
    nombre: 'Técnico de Campo',
    avatarUrl: 'https://picsum.photos/seed/user2/100/100'
  }
];

export const mockContributors: Contributor[] = [
  { id: 'C1', nombre_completo: 'Juan Pérez García', rfc: 'PEGA800101', telefono: '7571234567', email: 'juan.perez@email.com', fechaRegistro: '2023-01-15' },
  { id: 'C2', nombre_completo: 'María López Hernández', rfc: 'LOHM900202', telefono: '7577654321', email: 'maria.lopez@email.com', fechaRegistro: '2023-02-20' },
  { id: 'C3', nombre_completo: 'Carlos Sánchez Rodríguez', rfc: 'SARC750303', telefono: '7571122334', email: 'carlos.sanchez@email.com', fechaRegistro: '2023-03-10' },
  { id: 'C4', nombre_completo: 'Ana Martínez Flores', rfc: 'MAFA880404', telefono: '7574455667', email: 'ana.martinez@email.com', fechaRegistro: '2023-04-05' },
];

export const mockProperties: Property[] = [
  { id: 'P1', contribuyenteId: 'C1', direccionTexto: 'Calle Principal 123, Col. Centro', coordenadas: { lat: 17.5463, lng: -98.5727 }, colonia: 'Centro', municipio: 'Tlapa de Comonfort', estado: 'Guerrero', referencias: 'Frente al mercado', status: 'verified' },
  { id: 'P2', contribuyenteId: 'C2', direccionTexto: 'Av. Revolución 45, Col. San Diego', coordenadas: { lat: 17.5501, lng: -98.5789 }, colonia: 'San Diego', municipio: 'Tlapa de Comonfort', estado: 'Guerrero', referencias: 'Esquina con la iglesia', status: 'verified' },
  { id: 'P3', contribuyenteId: 'C3', direccionTexto: 'Privada Las Flores 8, Col. Tepeyac', coordenadas: { lat: 17.5411, lng: -98.5698 }, colonia: 'Tepeyac', municipio: 'Tlapa de Comonfort', estado: 'Guerrero', referencias: 'Casa de 2 pisos color azul', status: 'verified' },
  { id: 'P4', contribuyenteId: 'C4', direccionTexto: 'Callejón del Beso 10, Col. Contlalco', coordenadas: { lat: 17.5488, lng: -98.5655 }, colonia: 'Contlalco', municipio: 'Tlapa de Comonfort', estado: 'Guerrero', referencias: 'Portón de madera', status: 'pending' },
];

export const mockServices: Service[] = [
  // Property 1
  { id: 'S1A', inmuebleId: 'P1', tipo: 'agua', numeroServicio: 'AG-12345', fechaAlta: '2023-01-20', activo: true },
  { id: 'S1P', inmuebleId: 'P1', tipo: 'predial', numeroServicio: 'PR-67890', fechaAlta: '2023-01-20', activo: true },
  // Property 2
  { id: 'S2A', inmuebleId: 'P2', tipo: 'agua', numeroServicio: 'AG-54321', fechaAlta: '2023-02-25', activo: true },
  { id: 'S2C', inmuebleId: 'P2', tipo: 'catastro', numeroServicio: 'CA-09876', fechaAlta: '2023-02-25', activo: true },
  // Property 3
  { id: 'S3A', inmuebleId: 'P3', tipo: 'agua', numeroServicio: 'AG-65432', fechaAlta: '2023-03-15', activo: true },
  // Property 4
  { id: 'S4P', inmuebleId: 'P4', tipo: 'predial', numeroServicio: 'PR-11223', fechaAlta: '2023-04-10', activo: true },
];

export const mockPayments: Payment[] = [
  // Service S1A (Agua, P1) - GREEN
  { 
    id: 'PAY1', 
    servicioId: 'S1A', 
    contribuyenteId: 'C1',
    total: 150, 
    fechaPago: format(subMonths(today, 0), 'yyyy-MM-dd'), 
    periodoCubierto: format(subMonths(today, 1), 'yyyy-MM'), 
    formaPago: 'cash',
    folio: 1001,
    caja: 1,
    programa: 'PAGO_NORMAL',
    estadoRecibo: 'PAGADO',
    concepto: 'PAGO SERVICIO DE AGUA',
  },
  // Service S1P (Predial, P1) - GREEN
  { 
    id: 'PAY2', 
    servicioId: 'S1P', 
    contribuyenteId: 'C1',
    total: 500, 
    fechaPago: format(subMonths(today, 1), 'yyyy-MM-dd'), 
    periodoCubierto: format(subMonths(today, 1), 'yyyy-MM'), 
    formaPago: 'card',
    folio: 1002,
    caja: 2,
    programa: 'PAGO_NORMAL',
    estadoRecibo: 'PAGADO',
    concepto: 'PAGO PREDIAL 2024',
  },
  // Service S2A (Agua, P2) - ORANGE
  { 
    id: 'PAY3', 
    servicioId: 'S2A', 
    contribuyenteId: 'C2',
    total: 180, 
    fechaPago: format(subMonths(today, 2), 'yyyy-MM-dd'), 
    periodoCubierto: format(subMonths(today, 2), 'yyyy-MM'), 
    formaPago: 'cash',
    folio: 1003,
    caja: 1,
    programa: 'PAGO_NORMAL',
    estadoRecibo: 'PAGADO',
    concepto: 'PAGO SERVICIO DE AGUA',
  },
  // Service S2C (Catastro, P2) - GREEN
  { 
    id: 'PAY4', 
    servicioId: 'S2C', 
    contribuyenteId: 'C2',
    total: 300, 
    fechaPago: format(subMonths(today, 1), 'yyyy-MM-dd'), 
    periodoCubierto: format(subMonths(today, 1), 'yyyy-MM'), 
    formaPago: 'transfer',
    folio: 1004,
    caja: 1,
    programa: 'PAGO_NORMAL',
    estadoRecibo: 'PAGADO',
    concepto: 'PAGO SERVICIO CATASTRO',
  },
  // Service S3A (Agua, P3) - RED
  { 
    id: 'PAY5', 
    servicioId: 'S3A', 
    contribuyenteId: 'C3',
    total: 160, 
    fechaPago: format(subMonths(today, 4), 'yyyy-MM-dd'), 
    periodoCubierto: format(subMonths(today, 4), 'yyyy-MM'), 
    formaPago: 'card',
    folio: 1005,
    caja: 2,
    programa: 'PAGO_NORMAL',
    estadoRecibo: 'PAGADO',
    concepto: 'PAGO SERVICIO DE AGUA',
  },
  // Service S4P (Predial, P4) - RED (No payments)
];
