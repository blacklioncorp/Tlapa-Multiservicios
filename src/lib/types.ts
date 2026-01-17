
export type Contributor = {
  id: string;
  nombre_completo: string;
  rfc: string;
  telefono: string;
  email: string;
  fechaRegistro: string;
};

export type GeoPoint = {
  lat: number;
  lng: number;
};

export type Property = {
  id: string;
  contribuyenteId: string;
  direccionTexto: string;
  coordenadas: GeoPoint;
  colonia: string;
  municipio: string;
  estado: string;
  referencias: string;
  status: 'verified' | 'pending';
};

export type Service = {
  id: string;
  inmuebleId: string;
  tipo: 'agua' | 'predial' | 'catastro';
  numeroServicio: string;
  fechaAlta: string;
  activo: boolean;
};

export type Payment = {
  id: string; // Corresponde a UUID
  folio: number;
  caja: number;
  fechaPago: string;
  programa: string;
  clave?: string;
  estadoRecibo: string;
  formaPago: string;
  concepto: string;
  total: number;
  
  servicioId: string;
  contribuyenteId?: string;

  // El periodo cubierto ahora está dentro del 'concepto',
  // pero lo mantenemos para compatibilidad temporal con la lógica existente.
  periodoCubierto: string; 
};


export type AppUser = {
  uid: string;
  email: string;
  rol: 'admin' | 'tecnico' | 'cajero';
  nombre: string;
  avatarUrl?: string;
};

export type PaymentStatus = 'green' | 'orange' | 'red';
