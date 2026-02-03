"use client";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AddressAutocompleteProps {
    onSelect: (address: string, lat: number, lng: number) => void;
    defaultValue?: string;
}

export function AddressAutocomplete({ onSelect, defaultValue = "" }: AddressAutocompleteProps) {
    const [open, setOpen] = useState(false);

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { country: "mx" },
        },
        defaultValue,
        debounce: 300,
    });

    const handleSelect = async (address: string) => {
        setValue(address, false);
        clearSuggestions();
        setOpen(false);

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            onSelect(address, lat, lng);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value ? value.substring(0, 40) + (value.length > 40 ? "..." : "") : "Buscar dirección..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
                <Command shouldFilter={false}>
                    {/* We effectively disable internal filtering because Google does it */}
                    <CommandInput
                        placeholder="Escribe una dirección..."
                        value={value}
                        onValueChange={(val) => setValue(val)}
                        disabled={!ready}
                    />
                    <CommandList>
                        {status === "OK" && data.map(({ place_id, description }) => (
                            <CommandItem
                                key={place_id}
                                value={description}
                                onSelect={() => handleSelect(description)}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === description ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {description}
                            </CommandItem>
                        ))}
                        {status === "ZERO_RESULTS" && (
                            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
