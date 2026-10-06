import React from "react";
import { Truck, Package } from "lucide-react";

interface AppNavigationProps {
  activeView: "delivery-ops" | "inventory";
  onViewChange: (view: "delivery-ops" | "inventory") => void;
}

export const AppNavigation: React.FC<AppNavigationProps> = ({
  activeView,
  onViewChange,
}) => {
  return (
    <>
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-40 bg-white border-r border-slate-200 shadow-xs">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center gap-3 px-6 h-18 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-sm shadow-indigo-600/30 text-white shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                APEX LOGISTICS
              </span>
              <span className="text-[11px] font-medium text-slate-500 block">
                Central Operations
              </span>
            </div>
          </div>

          <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
            <div>
              <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Operations & Management
              </div>
              <nav className="space-y-1.5">
                <button
                  onClick={() => onViewChange("delivery-ops")}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-150 text-left ${
                    activeView === "delivery-ops"
                      ? "bg-indigo-50/90 text-indigo-700 font-bold border border-indigo-200/80 shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      activeView === "delivery-ops"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="leading-tight">Delivery Operations</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5 truncate">
                      Fleet dispatches & KPIs
                    </div>
                  </div>
                  {activeView === "delivery-ops" && (
                    <div className="w-1.5 h-6 rounded-full bg-indigo-600" />
                  )}
                </button>

                <button
                  onClick={() => onViewChange("inventory")}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-150 text-left ${
                    activeView === "inventory"
                      ? "bg-indigo-50/90 text-indigo-700 font-bold border border-indigo-200/80 shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      activeView === "inventory"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Package className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="leading-tight">Inventory Management</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5 truncate">
                      Stock catalog & warehouse
                    </div>
                  </div>
                  {activeView === "inventory" && (
                    <div className="w-1.5 h-6 rounded-full bg-indigo-600" />
                  )}
                </button>
              </nav>
            </div>
          </div>


        </div>
      </aside>

      <header className="md:hidden sticky top-0 z-30 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md px-4 h-14 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900">
            APEX LOGISTICS
          </span>
        </div>
        <div className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
          {activeView === "delivery-ops" ? "Delivery Ops" : "Inventory"}
        </div>
      </header>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/90 flex items-center justify-around px-4 shadow-lg pb-safe">
        <button
          onClick={() => onViewChange("delivery-ops")}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all ${
            activeView === "delivery-ops"
              ? "text-indigo-600 font-bold"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <div
            className={`p-1 rounded-lg ${
              activeView === "delivery-ops" ? "bg-indigo-50" : ""
            }`}
          >
            <Truck className="w-5 h-5" />
          </div>
          <span className="text-[11px] mt-0.5">Delivery Ops</span>
        </button>

        <button
          onClick={() => onViewChange("inventory")}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all ${
            activeView === "inventory"
              ? "text-indigo-600 font-bold"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <div
            className={`p-1 rounded-lg ${
              activeView === "inventory" ? "bg-indigo-50" : ""
            }`}
          >
            <Package className="w-5 h-5" />
          </div>
          <span className="text-[11px] mt-0.5">Inventory</span>
        </button>
      </nav>
    </>
  );
};
