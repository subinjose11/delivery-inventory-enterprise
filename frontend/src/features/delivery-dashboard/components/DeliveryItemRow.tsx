import React from "react";
import { MapPin, Clock, ChevronRight, Truck } from "lucide-react";
import { Delivery, DeliveryStatus, DeliveryPriority } from "../types/delivery.types";
import { Badge } from "../../../components/ui/Badge";

interface DeliveryItemRowProps {
  delivery: Delivery;
  onSelect: (delivery: Delivery) => void;
}

export const DeliveryItemRow: React.FC<DeliveryItemRowProps> = ({
  delivery,
  onSelect,
}) => {
  const getStatusBadge = (status: DeliveryStatus) => {
    switch (status) {
      case "delivered":
        return <Badge variant="success" dot>Delivered</Badge>;
      case "in_transit":
        return <Badge variant="warning" dot>In Transit</Badge>;
      case "failed":
        return <Badge variant="danger" dot>Failed</Badge>;
      case "pending":
      default:
        return <Badge variant="neutral" dot>Pending</Badge>;
    }
  };

  const getPriorityBadge = (priority: DeliveryPriority) => {
    switch (priority) {
      case "urgent":
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">URGENT</span>;
      case "express":
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">EXPRESS</span>;
      case "standard":
      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => onSelect(delivery)}
      className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-indigo-400 hover:shadow-sm cursor-pointer transition-all duration-150 flex items-center justify-between gap-3 group"
    >
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
            {delivery.trackingNumber}
          </span>
          {getPriorityBadge(delivery.priority)}
          <div className="ml-auto sm:ml-0">{getStatusBadge(delivery.status)}</div>
        </div>

        <div className="font-semibold text-sm text-slate-900 truncate">
          {delivery.recipientName}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          <span className="truncate">{delivery.address}</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500 pt-0.5">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            {delivery.scheduledTimeWindow}
          </span>
          {delivery.driverName && (
            <span className="flex items-center gap-1 text-slate-700 font-medium">
              <Truck className="w-3 h-3 text-indigo-600" />
              {delivery.driverName}
            </span>
          )}
        </div>
      </div>

      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
    </div>
  );
};
