export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface ProductFormData {
  name: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
}

export interface ProductFilterParams {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}
