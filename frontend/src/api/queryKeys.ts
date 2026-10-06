export const queryKeys = {
  products: {
    all: ['products'] as const,
    list: (params: Record<string, any>) => ['products', 'list', params] as const,
    detail: (id: string) => ['products', 'detail', id] as const,
    categories: ['products', 'categories'] as const,
  },
  deliveries: {
    all: ['deliveries'] as const,
    list: (params: Record<string, any>) => ['deliveries', 'list', params] as const,
    kpis: (date?: string) => ['deliveries', 'kpis', date] as const,
    trends: (date?: string) => ['deliveries', 'trends', date] as const,
    detail: (id: string) => ['deliveries', 'detail', id] as const,
  }
};
