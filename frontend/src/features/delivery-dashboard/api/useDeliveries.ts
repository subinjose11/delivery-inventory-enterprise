import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { apiClient } from "../../../api/client";
import { queryKeys } from "../../../api/queryKeys";
import { Delivery, KpiMetrics, TrendsResponse } from "../types/delivery.types";

export interface DeliveryQueryParams {
  status?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export function useDeliveries(
  params: DeliveryQueryParams = {},
  options: { enabled?: boolean } = {}
) {
  return useQuery({
    queryKey: queryKeys.deliveries.list(params),
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params.status && params.status !== "all") searchParams.set("status", params.status);
      if (params.search) searchParams.set("search", params.search);
      if (params.startDate) searchParams.set("start_date", params.startDate);
      if (params.endDate) searchParams.set("end_date", params.endDate);
      return apiClient<Delivery[]>("GET", `/deliveries?${searchParams.toString()}`);
    },
    placeholderData: keepPreviousData,
    enabled: options.enabled,
  });
}

export function useDeliveryKpis(
  startDate?: string,
  endDate?: string,
  options: { enabled?: boolean } = {}
) {
  return useQuery({
    queryKey: queryKeys.deliveries.kpis(`${startDate}_${endDate}`),
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (startDate) searchParams.set("start_date", startDate);
      if (endDate) searchParams.set("end_date", endDate);
      return apiClient<KpiMetrics>("GET", `/deliveries/kpis?${searchParams.toString()}`);
    },
    placeholderData: keepPreviousData,
    enabled: options.enabled,
  });
}

export function useDeliveryTrends(
  startDate?: string,
  endDate?: string,
  options: { enabled?: boolean } = {}
) {
  return useQuery({
    queryKey: queryKeys.deliveries.trends(`${startDate}_${endDate}`),
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (startDate) searchParams.set("start_date", startDate);
      if (endDate) searchParams.set("end_date", endDate);
      return apiClient<TrendsResponse>("GET", `/deliveries/trends?${searchParams.toString()}`);
    },
    placeholderData: keepPreviousData,
    enabled: options.enabled,
  });
}

export function useDeliveryDetail(id: string | null) {
  return useQuery({
    queryKey: queryKeys.deliveries.detail(id || ""),
    queryFn: () => apiClient<Delivery>("GET", `/deliveries/${id}`),
    enabled: !!id,
  });
}
