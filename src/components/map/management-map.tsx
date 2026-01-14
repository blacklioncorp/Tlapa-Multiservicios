"use client";

import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import type { Property, PaymentStatus } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Home, MapPin } from 'lucide-react';

const statusColors: Record<PaymentStatus, { dot: string; text: string }> = {
    green: { dot: 'bg-green-500', text: 'text-green-700'},
    orange: { dot: 'bg-orange-500', text: 'text-orange-700'},
    red: { dot: 'bg-red-500', text: 'text-red-700'},
};

const MarkerPin = ({ status }: { status: PaymentStatus }) => (
    <div className="relative">
      <MapPin className={`h-10 w-10 ${statusColors[status].text}`} fill="currentColor" strokeWidth={1} stroke="white" />
    </div>
);


export function ManagementMap({ properties }: { properties: (Property & { paymentStatus: PaymentStatus })[] }) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [markerRef, marker] = useAdvancedMarkerRef();

    if (!apiKey) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className='font-headline'>Mapa de Inmuebles</CardTitle>
                </CardHeader>
                <CardContent className='text-center'>
                    <p>La clave de API de Google Maps no está configurada.</p>
                    <p className='text-sm text-muted-foreground'>Por favor, añada NEXT_PUBLIC_GOOGLE_MAPS_API_KEY a su archivo .env.local</p>
                </CardContent>
            </Card>
        );
    }
    
    const center = properties.length > 0 ? properties[0].coordenadas : { lat: 17.5463, lng: -98.5727 };

    return (
        <Card>
            <CardHeader>
                <CardTitle className='font-headline'>Mapa de Inmuebles</CardTitle>
            </CardHeader>
            <CardContent>
                <div style={{ height: '60vh', width: '100%' }} className='rounded-lg overflow-hidden'>
                    <APIProvider apiKey={apiKey}>
                        <Map
                            defaultCenter={center}
                            defaultZoom={14}
                            mapId="tlapa-map"
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                        >
                            {properties.map((prop) => (
                                <AdvancedMarker
                                    key={prop.id}
                                    position={prop.coordenadas}
                                    onClick={() => setSelectedProperty(prop)}
                                    ref={prop.id === selectedProperty?.id ? markerRef : null}
                                >
                                    <MarkerPin status={prop.paymentStatus} />
                                </AdvancedMarker>
                            ))}
                            {selectedProperty && (
                                <InfoWindow
                                    anchor={marker}
                                    onCloseClick={() => setSelectedProperty(null)}
                                >
                                    <div className="p-2 min-w-48">
                                        <h3 className="font-bold text-base flex items-center gap-2"><Home className="w-4 h-4" /> Inmueble</h3>
                                        <p className="text-sm text-muted-foreground">{selectedProperty.direccionTexto}</p>
                                        <p className="text-sm mt-1">Colonia: {selectedProperty.colonia}</p>
                                        <div className='flex items-center gap-2 mt-2'>
                                            <span className='text-sm'>Estatus:</span>
                                            <div className={`w-3 h-3 rounded-full ${statusColors[selectedProperty.paymentStatus].dot}`} />
                                            <span className={`capitalize font-medium ${statusColors[selectedProperty.paymentStatus].text}`}>{selectedProperty.paymentStatus === 'green' ? 'Al corriente' : selectedProperty.paymentStatus === 'orange' ? 'Atrasado' : 'Mora'}</span>
                                        </div>
                                        <Button size="sm" className="w-full mt-4">Ver Detalles</Button>
                                    </div>
                                </InfoWindow>
                            )}
                        </Map>
                    </APIProvider>
                </div>
            </CardContent>
        </Card>
    );
}
