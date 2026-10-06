import React, { useState, useEffect } from "react";
import { Dialog } from "../../../components/ui/Dialog";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { Product, ProductFormData } from "../types/product.types";
import { useCreateProduct, useUpdateProduct } from "../api/useProducts";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  onSuccessNotification?: (msg: string) => void;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
  onSuccessNotification,
}) => {
  const isEditing = !!productToEdit;

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    sku: "",
    category: "",
    price: 0,
    quantity: 0,
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        sku: productToEdit.sku,
        category: productToEdit.category,
        price: productToEdit.price,
        quantity: productToEdit.quantity,
        description: productToEdit.description || "",
      });
    } else {
      setFormData({
        name: "",
        sku: "",
        category: "",
        price: 19.99,
        quantity: 10,
        description: "",
      });
    }
    setErrors({});
    setServerError(null);
  }, [productToEdit, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required.";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "Product SKU is required.";
    } else if (formData.sku.trim().length < 2) {
      newErrors.sku = "SKU must be at least 2 characters.";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required.";
    }

    if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Price must be a positive number (> 0).";
    }

    if (isNaN(formData.quantity) || formData.quantity < 0 || !Number.isInteger(Number(formData.quantity))) {
      newErrors.quantity = "Quantity must be a non-negative integer (>= 0).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    try {
      if (isEditing && productToEdit) {
        await updateMutation.mutateAsync({
          id: productToEdit.id,
          data: {
            ...formData,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
          },
        });
        if (onSuccessNotification) onSuccessNotification(`Product "${formData.name}" updated successfully.`);
      } else {
        await createMutation.mutateAsync({
          ...formData,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
        });
        if (onSuccessNotification) onSuccessNotification(`Product "${formData.name}" created successfully.`);
      }
      onClose();
    } catch (err: any) {
      if (err.status === 409) {
        setServerError(err.message || "A product with this SKU already exists.");
        setErrors((prev) => ({ ...prev, sku: "This SKU is already in use by another product." }));
      } else {
        setServerError(err.message || "An unexpected error occurred. Please verify inputs.");
      }
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Product" : "Create New Inventory Item"}
      description={isEditing ? `Update details for SKU ${productToEdit?.sku}` : "Add a new product to your central warehouse inventory."}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {serverError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs font-medium">
            {serverError}
          </div>
        )}

        {}
        <Input
          label="Product Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Apex Industrial Ergonomic Chair"
          error={errors.name}
        />

        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="SKU (Unique)"
            required
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
            placeholder="e.g. CHR-IND-100"
            error={errors.sku}
            helperText="SKU must be unique across all products"
          />
          <Input
            label="Category"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="e.g. Furniture, Electronics"
            error={errors.category}
          />
        </div>

        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Unit Price ($)"
            required
            type="number"
            step="0.01"
            min="0.01"
            value={formData.price || ""}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            placeholder="0.00"
            error={errors.price}
          />
          <Input
            label="Stock Quantity"
            required
            type="number"
            step="1"
            min="0"
            value={formData.quantity === 0 ? "0" : formData.quantity || ""}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value, 10) || 0 })}
            placeholder="0"
            error={errors.quantity}
          />
        </div>

        {}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Description (Optional)
          </label>
          <textarea
            rows={3}
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Product specifications, storage instructions, or warranty notes..."
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          />
        </div>

        {}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading}>
            {isEditing ? "Save Changes" : "Create Product"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
