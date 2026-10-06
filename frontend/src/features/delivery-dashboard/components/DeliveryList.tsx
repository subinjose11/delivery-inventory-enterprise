import React from "react";
import { Search } from "lucide-react";
import { Delivery } from "../types/delivery.types";
import { DeliveryItemRow } from "./DeliveryItemRow";
import { Skeleton } from "../../../components/ui/Skeleton";

interface DeliveryListProps {
  deliveries?: Delivery[];
  isLoading: boolean;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
  onSelectDelivery: (delivery: Delivery) => void;
  counts?: Record<string, number>;
}

export const DeliveryList: React.FC<DeliveryListProps> = ({
  deliveries = [],
  isLoading,
  selectedStatus,
  onStatusChange,
  search,
  onSearchChange,
  onSelectDelivery,
  counts = {},
}) => {
  const [localSearch, setLocalSearch] = React.useState(search);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        onSearchChange(localSearch);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, search, onSearchChange]);
  const tabs = [
    { key: "all", label: "All Orders", count: counts.all || deliveries.length },
    { key: "in_transit", label: "In Transit", count: counts.in_transit },
    { key: "delivered", label: "Delivered", count: counts.delivered },
    { key: "failed", label: "Failed Attempts", count: counts.failed },
    { key: "pending", label: "Pending", count: counts.pending },
  ];

  return (
    <div className="space-y-4">
      {}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onStatusChange(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStatus === tab.key
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  selectedStatus === tab.key ? "bg-white text-indigo-700" : "bg-slate-100 text-slate-600"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search tracking #, recipient, city..."
            className="w-full pl-9 pr-3.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
          />
        </div>
      </div>

      {}
      {(isLoading && deliveries.length === 0) ? (
        <div className="space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : deliveries.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-xs text-slate-500 shadow-xs">
          No delivery orders match your active filter criteria.
        </div>
      ) : (
        <div className="space-y-2.5">
          {deliveries.map((delivery) => (
            <DeliveryItemRow
              key={delivery.id}
              delivery={delivery}
              onSelect={onSelectDelivery}
            />
          ))}
        </div>
      )}
    </div>
  );
};
