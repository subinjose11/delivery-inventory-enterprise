import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { HourlyTrendItem } from "../types/delivery.types";
import { Skeleton } from "../../../components/ui/Skeleton";

interface PerformanceTrendChartProps {
  trends?: HourlyTrendItem[];
  isLoading: boolean;
}

export const PerformanceTrendChart: React.FC<PerformanceTrendChartProps> = ({
  trends,
  isLoading,
}) => {
  if (isLoading) {
    return <Skeleton className="h-56 w-full rounded-xl" />;
  }

  const data = trends || [];

  return (
    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div>
          <h4 className="text-sm font-bold text-slate-900 tracking-tight">
            Hourly Delivery Volume vs Completion Target
          </h4>
          <p className="text-xs text-slate-500">Cumulative dispatch progression throughout the operational day</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-indigo-600"></span>
            <span className="text-slate-700">Completed Volume</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-slate-300"></span>
            <span className="text-slate-500">Target Line</span>
          </div>
        </div>
      </div>

      <div className="h-48 sm:h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="completedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="hour"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderColor: "#e2e8f0",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#0f172a",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#94a3b8"
              strokeDasharray="4 4"
              fill="transparent"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#4f46e5"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#completedGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
