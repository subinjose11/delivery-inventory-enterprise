import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AppNavigation } from "./components/common/AppNavigation";
import { WebPortalLayout } from "./layouts/WebPortalLayout";
import { MobileShellLayout } from "./layouts/MobileShellLayout";
import { ProductSummaryCards } from "./features/inventory/components/ProductSummaryCards";
import { ProductSearchFilterBar } from "./features/inventory/components/ProductSearchFilterBar";
import { ProductTable } from "./features/inventory/components/ProductTable";
import { ProductFormModal } from "./features/inventory/components/ProductFormModal";
import { ProductDeleteDialog } from "./features/inventory/components/ProductDeleteDialog";
import { useProducts, useCategories, useInventorySummary } from "./features/inventory/api/useProducts";
import { Product } from "./features/inventory/types/product.types";
import { queryKeys } from "./api/queryKeys";

import { DateFilterBar, DateRange, formatYMD } from "./features/delivery-dashboard/components/DateFilterBar";
import { KpiMetricsSection } from "./features/delivery-dashboard/components/KpiMetricsSection";
import { PerformanceTrendChart } from "./features/delivery-dashboard/components/PerformanceTrendChart";
import { DeliveryList } from "./features/delivery-dashboard/components/DeliveryList";
import { DeliveryDetailDrawer } from "./features/delivery-dashboard/components/DeliveryDetailDrawer";
import { useDeliveries, useDeliveryKpis, useDeliveryTrends } from "./features/delivery-dashboard/api/useDeliveries";
import { Delivery } from "./features/delivery-dashboard/types/delivery.types";

export function App() {
  const queryClient = useQueryClient();
  const [activeView, setActiveView] = useState<"delivery-ops" | "inventory">("delivery-ops");

  const handleViewChange = (view: "delivery-ops" | "inventory") => {
    setActiveView(view);
    if (view === "delivery-ops") {
      queryClient.invalidateQueries({ queryKey: queryKeys.deliveries.all });
    } else {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    }
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [inventorySearch, setInventorySearch] = useState("");
  const [inventoryCategory, setInventoryCategory] = useState("All");
  const [inventoryPage, setInventoryPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const isInventoryView = activeView === "inventory";
  const isDeliveryView = activeView === "delivery-ops";

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching
  } = useProducts(
    {
      search: inventorySearch,
      category: inventoryCategory,
      page: inventoryPage,
      limit: 10,
    },
    { enabled: isInventoryView }
  );

  const { data: inventorySummary } = useInventorySummary({ enabled: isInventoryView });
  const { data: categories = [] } = useCategories({ enabled: isInventoryView });

  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 5);

    return {
      startDate: formatYMD(start),
      endDate: formatYMD(end),
      preset: "last_5_days",
    };
  });

  const [deliveryStatus, setDeliveryStatus] = useState("all");
  const [deliverySearch, setDeliverySearch] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);

  const {
    data: kpis,
    isLoading: isKpisLoading
  } = useDeliveryKpis(dateRange.startDate, dateRange.endDate, { enabled: isDeliveryView });

  const {
    data: trendsData,
    isLoading: isTrendsLoading
  } = useDeliveryTrends(dateRange.startDate, dateRange.endDate, { enabled: isDeliveryView });

  const {
    data: deliveries,
    isLoading: isDeliveriesLoading
  } = useDeliveries(
    {
      status: deliveryStatus,
      search: deliverySearch,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    },
    { enabled: isDeliveryView }
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-800 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      <AppNavigation
        activeView={activeView}
        onViewChange={handleViewChange}
      />

      <div className="md:pl-64 flex-1 flex flex-col pb-20 md:pb-8">
        {activeView === "delivery-ops" && (
        <MobileShellLayout>
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                Fleet Logistics & Dispatches
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Delivery Operations Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Real-time operational KPIs, hourly delivery completion curves, and driver dispatch tracking.
              </p>
            </div>

            <DateFilterBar
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />

            <KpiMetricsSection
              kpis={kpis}
              isLoading={isKpisLoading}
            />

            <PerformanceTrendChart
              trends={trendsData?.trends}
              isLoading={isTrendsLoading}
            />

            <DeliveryList
              deliveries={deliveries}
              isLoading={isDeliveriesLoading}
              selectedStatus={deliveryStatus}
              onStatusChange={setDeliveryStatus}
              search={deliverySearch}
              onSearchChange={setDeliverySearch}
              onSelectDelivery={setSelectedDelivery}
              counts={kpis?.countsByStatus}
            />

            <DeliveryDetailDrawer
              delivery={selectedDelivery}
              onClose={() => setSelectedDelivery(null)}
            />
          </div>
        </MobileShellLayout>
      )}

      {activeView === "inventory" && (
        <WebPortalLayout>
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                Supply Chain & Warehouses
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                Inventory Management System
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Centralized stock control with strict SKU validation, stock status alerts, and paginated catalog management.
              </p>
            </div>

            <ProductSummaryCards
              summary={inventorySummary}
            />

            <ProductSearchFilterBar
              search={inventorySearch}
              onSearchChange={(val) => {
                setInventorySearch(val);
                setInventoryPage(1);
              }}
              category={inventoryCategory}
              onCategoryChange={(val) => {
                setInventoryCategory(val);
                setInventoryPage(1);
              }}
              categories={categories}
              onOpenCreateModal={() => {
                setProductToEdit(null);
                setIsCreateModalOpen(true);
              }}
            />

            <ProductTable
              data={productsData}
              isLoading={isProductsLoading}
              isFetching={isProductsFetching}
              page={inventoryPage}
              onPageChange={setInventoryPage}
              onEdit={(prod) => {
                setProductToEdit(prod);
                setIsCreateModalOpen(true);
              }}
              onDelete={(prod) => {
                setProductToDelete(prod);
              }}
            />

            <ProductFormModal
              isOpen={isCreateModalOpen}
              onClose={() => {
                setIsCreateModalOpen(false);
                setProductToEdit(null);
              }}
              productToEdit={productToEdit}
              onSuccessNotification={showToast}
            />

            <ProductDeleteDialog
              isOpen={!!productToDelete}
              onClose={() => setProductToDelete(null)}
              product={productToDelete}
              onSuccessNotification={showToast}
            />
          </div>
        </WebPortalLayout>
      )}
      </div>
    </div>
  );
}
