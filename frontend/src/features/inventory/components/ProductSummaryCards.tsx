import React from "react";
import { Package, DollarSign, AlertCircle, CheckCircle2 } from "lucide-react";
import { InventorySummary } from "../api/useProducts";
import { formatCurrency } from "../../../lib/utils";

interface ProductSummaryCardsProps {
  summary?: InventorySummary;
  isLoading?: boolean;
}

const ProductSummaryCardsComponent: React.FC<ProductSummaryCardsProps> = ({
  summary,
}) => {
  const total = summary?.total || 0;
  const valuation = summary?.totalValuation || 0;
  const lowStock = summary?.lowStockCount || 0;
  const outOfStock = summary?.outOfStockCount || 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider">Total Catalog</span>
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Package className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-black text-slate-900 tracking-tight">
          {total} <span className="text-xs font-semibold text-slate-500 font-sans">SKUs</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1">Across 8 registered categories</div>
      </div>

      {}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider">Total Valuation</span>
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-black text-emerald-600 tracking-tight">
          {formatCurrency(valuation)}
        </div>
        <div className="text-[11px] text-slate-500 mt-1">Total catalog asset value</div>
      </div>

      {}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider">Low Stock Warnings</span>
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-black text-amber-600 tracking-tight">
          {lowStock} <span className="text-xs font-semibold text-slate-500 font-sans">Items</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1">Stock level &le; 5 units remaining</div>
      </div>

      {}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider">Out of Stock</span>
          <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-black text-rose-600 tracking-tight">
          {outOfStock} <span className="text-xs font-semibold text-slate-500 font-sans">Items</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1">Requires immediate procurement</div>
      </div>
    </div>
  );
};

export const ProductSummaryCards = React.memo(ProductSummaryCardsComponent);
