import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { apiClient } from "../../../api/client";
import { queryKeys } from "../../../api/queryKeys";
import { Product, ProductsResponse, ProductFormData, ProductFilterParams } from "../types/product.types";

export interface InventorySummary {
  total: number;
  totalValuation: number;
  lowStockCount: number;
  outOfStockCount: number;
}

export function useProducts(params: ProductFilterParams, options: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params.search) searchParams.set("search", params.search);
      if (params.category && params.category !== "All") searchParams.set("category", params.category);
      if (params.page) searchParams.set("page", params.page.toString());
      if (params.limit) searchParams.set("limit", params.limit.toString());

      return apiClient<ProductsResponse>("GET", `/products?${searchParams.toString()}`);
    },
    placeholderData: keepPreviousData,
    enabled: options.enabled,
  });
}

export function useInventorySummary(options: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: ['products', 'summary'] as const,
    queryFn: () => apiClient<InventorySummary>("GET", "/products/summary"),
    enabled: options.enabled,
  });
}

export function useCategories(options: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: queryKeys.products.categories,
    queryFn: () => apiClient<string[]>("GET", "/products/categories"),
    staleTime: 1000 * 60 * 5,
    enabled: options.enabled,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductFormData) => {
      return apiClient<Product>("POST", "/products", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProductFormData> }) => {
      return apiClient<Product>("PUT", `/products/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return apiClient<void>("DELETE", `/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}
