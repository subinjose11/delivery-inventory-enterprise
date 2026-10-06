import React from "react";
import { TrendingUp, TrendingDown, Package, CheckCircle2, Navigation, AlertOctagon } from "lucide-react";
import { KpiMetrics } from "../types/delivery.types";
import { Skeleton } from "../../../components/ui/Skeleton";

interface KpiMetricsSectionProps {
  kpis?: KpiMetrics;
  isLoading: boolean;
}

export const KpiMetricsSection: React.FC<KpiMetricsSectionProps> = ({
  kpis,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    );
  }

  const renderDelta = (delta: number, inverted = false) => {
    const isPositive = delta >= 0;
    const isGood = inverted ? !isPositive : isPositive;

    return (
      <span
        className={`inline-flex items-center text-xs font-semibold gap-0.5 ${
          isGood ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {isPositive ? `+${delta}%` : `${delta}%`}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs relative overflow-hidden group hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-1.5">
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">Total Volume</span>
          <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Package className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {kpis?.totalVolume || 0}
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
          <span>vs Yesterday</span>
          {renderDelta(kpis?.totalVolumeDeltaPct || 12.5)}
        </div>
      </div>

      {}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs relative overflow-hidden group hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-1.5">
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">On-Time %</span>
          <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
          {kpis?.completionRatePct || 0}%
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
          <span>Target: 95%</span>
          {renderDelta(kpis?.completionRateDeltaPct || 3.2)}
        </div>
      </div>

      {}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs relative overflow-hidden group hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-1.5">
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">Active En Route</span>
          <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <Navigation className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-amber-600 tracking-tight">
          {kpis?.activeFleet || 0}
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
          <span>Live Drivers</span>
          {renderDelta(kpis?.activeFleetDeltaPct || -2.4)}
        </div>
      </div>

      {}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs relative overflow-hidden group hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-1.5">
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">Exceptions</span>
          <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
            <AlertOctagon className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight">
          {kpis?.exceptionRatePct || 0}%
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
          <span>Failed Attempts</span>
          {renderDelta(kpis?.exceptionRateDeltaPct || -0.8, true)}
        </div>
      </div>
    </div>
  );
};
