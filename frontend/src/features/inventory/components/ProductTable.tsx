import React from "react";
import { Edit2, Trash2, ChevronLeft, ChevronRight, Package } from "lucide-react";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { Skeleton } from "../../../components/ui/Skeleton";
import { Product, ProductsResponse } from "../types/product.types";
import { formatCurrency, formatDate } from "../../../lib/utils";

interface ProductTableProps {
  data?: ProductsResponse;
  isLoading: boolean;
  isFetching?: boolean;
  page: number;
  onPageChange: (page: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductTableComponent: React.FC<ProductTableProps> = ({
  data,
  isLoading,
  isFetching = false,
  page,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  const getStockBadge = (quantity: number) => {
    if (quantity === 0) {
      return <Badge variant="danger" dot>Out of Stock</Badge>;
    } else if (quantity <= 5) {
      return <Badge variant="warning" dot>Low Stock ({quantity})</Badge>;
    }
    return <Badge variant="success" dot>In Stock ({quantity})</Badge>;
  };

  if (isLoading && !data) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs p-6 space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  const items = data?.items || [];
  const total = data?.total || 0;
  const totalPages = data?.total_pages || 1;

  if (items.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-xs">
        <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-400">
          <Package className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No products found</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          No inventory products match your current search or category filter. Try clearing filters or adding a new product.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col relative">
      {}
      {isFetching && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-indigo-500/20 overflow-hidden z-10">
          <div className="h-full bg-indigo-600 animate-pulse w-full"></div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-4">Product Name</th>
              <th className="py-3.5 px-4">SKU</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Price</th>
              <th className="py-3.5 px-4">Stock Status</th>
              <th className="py-3.5 px-4 hidden lg:table-cell">Last Updated</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {items.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </div>
                  {product.description && (
                    <div className="text-xs text-slate-500 line-clamp-1 max-w-xs sm:max-w-md">
                      {product.description}
                    </div>
                  )}
                </td>
                <td className="py-3.5 px-4 font-mono text-xs font-bold text-indigo-700">
                  {product.sku}
                </td>
                <td className="py-3.5 px-4">
                  <Badge variant="neutral">{product.category}</Badge>
                </td>
                <td className="py-3.5 px-4 font-mono font-medium text-slate-800">
                  {formatCurrency(product.price)}
                </td>
                <td className="py-3.5 px-4">
                  {getStockBadge(product.quantity)}
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-500 hidden lg:table-cell">
                  {formatDate(product.updatedAt)}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onEdit(product)}
                      title="Edit product"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      title="Delete product"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {}
      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50/60 text-xs text-slate-600">
        <div>
          Showing <span className="font-semibold text-slate-900">{items.length}</span> of{" "}
          <span className="font-semibold text-slate-900">{total}</span> inventory items
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductTable = React.memo(ProductTableComponent);
