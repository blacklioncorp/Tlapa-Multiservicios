"use client";

import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

const SYNC_QUEUE_KEY = "tlapa_sync_queue";

// Generic function to queue a mutation
export async function queueMutation(url: string, method: string, body: any) {
    const mutation = {
        id: crypto.randomUUID(),
        url,
        method,
        body,
        timestamp: Date.now(),
    };

    // 1. Try to send immediately if online
    if (navigator.onLine) {
        try {
            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            return { success: true, offline: false };
        } catch (error) {
            console.warn("Network failed, queuing...", error);
        }
    }

    // 2. Queue for later
    const currentQueue = JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) || "[]");
    currentQueue.push(mutation);
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(currentQueue));

    return { success: true, offline: true };
}

// Hook to handle sync
export function useOfflineSync() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        // Check initial status (server side safe)
        if (typeof window !== "undefined") {
            setIsOnline(navigator.onLine);
        }

        const handleOnline = async () => {
            setIsOnline(true);
            toast({ title: "Conexión restaurada", description: "Sincronizando datos..." });

            const queue = JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) || "[]");
            if (queue.length === 0) return;

            const remaining = [];
            for (const item of queue) {
                try {
                    await fetch(item.url, {
                        method: item.method,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(item.body),
                    });
                } catch (error) {
                    console.error("Sync failed for item", item.id, error);
                    remaining.push(item); // Keep in queue if still failing
                }
            }

            localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(remaining));

            if (remaining.length === 0) {
                toast({ title: "Sincronización completa", description: "Todos los datos se han guardado." });
            } else {
                toast({ title: "Sincronización parcial", description: "Algunos datos siguen pendientes." });
            }
        };

        const handleOffline = () => {
            setIsOnline(false);
            toast({ title: "Sin conexión", description: "Modo offline activado. Los datos se guardarán localmente." });
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return isOnline;
}
