"use client";

import { KpiCard } from "./kpi-card";
import { ArrowUpRight, Users, Home, Percent, AlertTriangle, CircleDollarSign } from "lucide-react";
import { RevenueChart } from "./revenue-chart";
import { ServicesChart } from "./services-chart";
import { ManagementMap } from "../map/management-map";
import type { Property, PaymentStatus } from "@/lib/types";

type DashboardClientProps = {
    kpis: {
        totalContributors: number;
        totalProperties: number;
        currentServicesPercentage: number;
        criticalServices: number;
        monthlyRevenue: number;
        yearlyRevenue: number;
    };
    revenueChartData: { month: string; total: number }[];
    servicesChartData: { name: string; value: number }[];
    properties: (Property & { paymentStatus: PaymentStatus })[];
}

export function DashboardClient({ kpis, revenueChartData, servicesChartData, properties }: DashboardClientProps) {
    
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard
                    title="Total Contribuyentes"
                    value={kpis.totalContributors.toLocaleString()}
                    icon={Users}
                    trendValue="+2.5%"
                    trendIcon={ArrowUpRight}
                />
                <KpiCard
                    title="Total Inmuebles"
                    value={kpis.totalProperties.toLocaleString()}
                    icon={Home}
                    trendValue="+5.1%"
                    trendIcon={ArrowUpRight}
                />
                <KpiCard
                    title="% Servicios al Corriente"
                    value={`${kpis.currentServicesPercentage.toFixed(1)}%`}
                    icon={Percent}
                    trendValue="-1.2%"
                />
                <KpiCard
                    title="Servicios en Mora Crítica"
                    value={kpis.criticalServices.toLocaleString()}
                    icon={AlertTriangle}
                    trendValue="+10"
                    trendDirection="bad"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                <RevenueChart data={revenueChartData} className="lg:col-span-3" />
                <ServicesChart data={servicesChartData} className="lg:col-span-2" />
            </div>

            <div className="grid grid-cols-1 gap-4">
                 <ManagementMap properties={properties} />
            </div>
        </>
    );
}
