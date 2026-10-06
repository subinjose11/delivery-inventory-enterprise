export type DeliveryStatus = "pending" | "in_transit" | "delivered" | "failed";
export type DeliveryPriority = "standard" | "express" | "urgent";

export interface MilestoneItem {
  timestamp: string;
  status: string;
  notes: string;
  location?: string | null;
}

export interface Delivery {
  id: string;
  trackingNumber: string;
  recipientName: string;
  recipientPhone: string;
  address: string;
  status: DeliveryStatus;
  priority: DeliveryPriority;
  driverName?: string | null;
  driverPhone?: string | null;
  scheduledTimeWindow: string;
  timeline: MilestoneItem[];
  createdAt: string;
  updatedAt: string;
}

export interface KpiMetrics {
  totalVolume: number;
  totalVolumeDeltaPct: number;
  completionRatePct: number;
  completionRateDeltaPct: number;
  activeFleet: number;
  activeFleetDeltaPct: number;
  exceptionRatePct: number;
  exceptionRateDeltaPct: number;
  countsByStatus?: {
    all: number;
    in_transit: number;
    delivered: number;
    failed: number;
    pending: number;
  };
}

export interface HourlyTrendItem {
  hour: string;
  target: number;
  completed: number;
  active: number;
}

export interface TrendsResponse {
  date: string;
  trends: HourlyTrendItem[];
}
