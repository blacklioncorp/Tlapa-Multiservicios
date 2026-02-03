"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getGeocode } from "use-places-autocomplete";

interface GeolocationButtonProps {
    onLocationFound: (address: string, lat: number, lng: number) => void;
}

export function GeolocationButton({ onLocationFound }: GeolocationButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleGetLocation = () => {
        setIsLoading(true);

        if (!navigator.geolocation) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "La geolocalización no es soportada por este navegador.",
            });
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude: lat, longitude: lng } = position.coords;

                try {
                    // Reverse Geocoding
                    const results = await getGeocode({ location: { lat, lng } });
                    const address = results[0]?.formatted_address || "Ubicación actual"; // Fallback

                    onLocationFound(address, lat, lng);

                    toast({
                        title: "Ubicación encontrada",
                        description: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
                    });
                } catch (error) {
                    console.error("Reverse geocoding error:", error);
                    toast({
                        variant: "destructive",
                        title: "Error de dirección",
                        description: "Se encontraron las coordenadas pero falló la dirección.",
                    });
                    // Return at least coords if geocoding fails? 
                    // For now, let's treat it as a partial success if needed, but UI expects address.
                    onLocationFound("Dirección desconocida", lat, lng);
                } finally {
                    setIsLoading(false);
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                toast({
                    variant: "destructive",
                    title: "Error de ubicación",
                    description: "No se pudo obtener tu ubicación. Verifica los permisos.",
                });
                setIsLoading(false);
            }
        );
    };

    return (
        <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={handleGetLocation}
            disabled={isLoading}
            title="Obtener mi ubicación"
        >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
        </Button>
    );
}
