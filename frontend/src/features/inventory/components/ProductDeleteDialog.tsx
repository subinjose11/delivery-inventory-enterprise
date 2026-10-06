import React from "react";
import { AlertTriangle } from "lucide-react";
import { Dialog } from "../../../components/ui/Dialog";
import { Button } from "../../../components/ui/Button";
import { Product } from "../types/product.types";
import { useDeleteProduct } from "../api/useProducts";

interface ProductDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSuccessNotification?: (msg: string) => void;
}

export const ProductDeleteDialog: React.FC<ProductDeleteDialogProps> = ({
  isOpen,
  onClose,
  product,
  onSuccessNotification,
}) => {
  const deleteMutation = useDeleteProduct();

  if (!product) return null;

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(product.id);
      if (onSuccessNotification) {
        onSuccessNotification(`Product "${product.name}" (${product.sku}) was deleted.`);
      }
      onClose();
    } catch (err: any) {
      alert(err.message || "Failed to delete product.");
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Product Deletion"
      maxWidth="md"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold text-rose-900">Destructive Action:</span> This action cannot be undone. All inventory records, historical stock counts, and SKU mappings for this item will be permanently removed.
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-1.5">
          <div className="text-slate-500">Target Product:</div>
          <div className="font-bold text-slate-900 text-sm">{product.name}</div>
          <div className="flex gap-4 text-slate-600">
            <span>SKU: <strong className="text-slate-800 font-mono">{product.sku}</strong></span>
            <span>Category: <strong className="text-slate-800">{product.category}</strong></span>
            <span>Quantity: <strong className="text-slate-800">{product.quantity}</strong></span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="ghost" onClick={onClose} disabled={deleteMutation.isPending}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            isLoading={deleteMutation.isPending}
          >
            Yes, Delete Product
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
