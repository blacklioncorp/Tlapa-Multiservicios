import { MapPin } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-primary ${className}`}>
      <MapPin className="h-8 w-8 text-primary" />
      <div className="flex flex-col">
        <span className="font-headline text-xl font-bold leading-none">
          Tlapa
        </span>
        <span className="text-xs font-semibold leading-none text-muted-foreground">
          Multiservicios
        </span>
      </div>
    </div>
  );
}
