import React, { useState } from "react";
import { Calendar, ArrowRight, RotateCcw } from "lucide-react";

export interface DateRange {
  startDate: string;
  endDate: string;
  preset: string;
}

interface DateFilterBarProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export const formatYMD = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const DateFilterBar: React.FC<DateFilterBarProps> = ({
  dateRange,
  onDateRangeChange,
}) => {
  const [isCustomOpen, setIsCustomOpen] = useState(dateRange.preset === "custom");
  const [customStart, setCustomStart] = useState(dateRange.startDate);
  const [customEnd, setCustomEnd] = useState(dateRange.endDate);

  const now = new Date();
  const todayStr = formatYMD(now);

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const fiveDaysAgo = new Date(now);
  fiveDaysAgo.setDate(now.getDate() - 5);

  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const presets = [
    { label: "Today", value: "today", start: todayStr, end: todayStr },
    { label: "Yesterday", value: "yesterday", start: formatYMD(yesterday), end: formatYMD(yesterday) },
    { label: "Last 5 Days", value: "last_5_days", start: formatYMD(fiveDaysAgo), end: todayStr },
    { label: "Last 7 Days", value: "last_7_days", start: formatYMD(sevenDaysAgo), end: todayStr },
    { label: "Last 30 Days", value: "last_30_days", start: formatYMD(thirtyDaysAgo), end: todayStr },
    { label: "This Month", value: "this_month", start: formatYMD(firstDayOfMonth), end: formatYMD(lastDayOfMonth) },
  ];

  const handleSelectPreset = (p: typeof presets[0]) => {
    setIsCustomOpen(false);
    onDateRangeChange({
      startDate: p.start,
      endDate: p.end,
      preset: p.value,
    });
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customStart && customEnd) {
      onDateRangeChange({
        startDate: customStart,
        endDate: customEnd,
        preset: "custom",
      });
    }
  };

  const formatDateDisplay = (dateStr: string) => {
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Selected Operational Window
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
              <span>{formatDateDisplay(dateRange.startDate)}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatDateDisplay(dateRange.endDate)}</span>
              {dateRange.startDate === dateRange.endDate && (
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full ml-1">
                  1 Day
                </span>
              )}
            </div>
          </div>
        </div>

        {}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {presets.map((p) => (
            <button
              key={p.value}
              onClick={() => handleSelectPreset(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                dateRange.preset === p.value
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
              }`}
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={() => setIsCustomOpen(!isCustomOpen)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
              isCustomOpen || dateRange.preset === "custom"
                ? "bg-indigo-50 text-indigo-700 border-indigo-300"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            Custom Range...
          </button>
        </div>
      </div>

      {}
      {isCustomOpen && (
        <form
          onSubmit={handleApplyCustom}
          className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 animate-in fade-in duration-150"
        >
          <div className="flex items-center gap-2 flex-1">
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={customStart}
                max={customEnd || todayStr}
                onChange={(e) => setCustomStart(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-medium"
              />
            </div>
            <div className="text-slate-400 pt-5">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                End Date
              </label>
              <input
                type="date"
                value={customEnd}
                min={customStart}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 sm:pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              Apply Custom Range
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset(presets[0])}
              className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
              title="Reset to Today"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
