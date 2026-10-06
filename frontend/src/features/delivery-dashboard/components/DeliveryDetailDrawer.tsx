import React, { useEffect } from "react";
import { X, Phone, MapPin, Truck } from "lucide-react";
import { Delivery } from "../types/delivery.types";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";

interface DeliveryDetailDrawerProps {
  delivery: Delivery | null;
  onClose: () => void;
}

export const DeliveryDetailDrawer: React.FC<DeliveryDetailDrawerProps> = ({
  delivery,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && delivery) onClose();
    };
    if (delivery) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [delivery, onClose]);

  if (!delivery) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center sm:p-4">
      {}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {}
      <div className="relative w-full max-w-xl bg-white border-t sm:border border-slate-200 rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto z-15 animate-in slide-in-from-bottom duration-200">
        {}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 mb-1 sm:hidden"></div>

        {}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-indigo-600">
                {delivery.trackingNumber}
              </span>
              <Badge variant={delivery.status === "delivered" ? "success" : delivery.status === "failed" ? "danger" : "warning"} dot>
                {delivery.status.replace("_", " ").toUpperCase()}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Order Detail & Tracking Timeline</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recipient Details</span>
              <span className="text-xs font-mono text-slate-600 font-medium">{delivery.scheduledTimeWindow}</span>
            </div>
            <div className="text-base font-bold text-slate-900">{delivery.recipientName}</div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{delivery.address}</span>
            </div>
            <div className="pt-1">
              <a
                href={`tel:${delivery.recipientPhone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 shadow-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                Call Recipient ({delivery.recipientPhone})
              </a>
            </div>
          </div>

          {}
          {delivery.driverName && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Assigned Courier</div>
                  <div className="font-bold text-sm text-slate-900">{delivery.driverName}</div>
                  {delivery.driverPhone && (
                    <div className="text-xs text-slate-500">{delivery.driverPhone}</div>
                  )}
                </div>
              </div>
              {delivery.driverPhone && (
                <a
                  href={`tel:${delivery.driverPhone}`}
                  className="p-2 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                </a>
              )}
            </div>
          )}

          {}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Milestone Audit Trail
              </h4>
              <span className="text-xs text-slate-500 font-mono">
                {delivery.timeline.length} Events Logged
              </span>
            </div>

            <div className="relative pl-6 space-y-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {delivery.timeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  {}
                  <div className={`absolute -left-6 top-1.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                    idx === delivery.timeline.length - 1
                      ? "border-indigo-600 text-indigo-600"
                      : "border-slate-400 text-slate-400"
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-800">
                        {item.status}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{item.notes}</p>
                    {item.location && (
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {item.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Close Details
          </Button>
        </div>
      </div>
    </div>
  );
};
