import enum
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field

class DeliveryStatus(str, enum.Enum):
    PENDING = "pending"
    IN_TRANSIT = "in_transit"
    DELIVERED = "delivered"
    FAILED = "failed"

class DeliveryPriority(str, enum.Enum):
    STANDARD = "standard"
    EXPRESS = "express"
    URGENT = "urgent"

class MilestoneItem(BaseModel):
    timestamp: str
    status: str
    notes: str
    location: Optional[str] = None

class DeliveryResponse(BaseModel):
    id: str
    trackingNumber: str
    recipientName: str
    recipientPhone: str
    address: str
    status: DeliveryStatus
    priority: DeliveryPriority
    driverName: Optional[str] = None
    driverPhone: Optional[str] = None
    scheduledTimeWindow: str
    timeline: List[MilestoneItem] = []
    createdAt: datetime
    updatedAt: datetime

    class Config:
        populate_by_name = True

class KpiMetrics(BaseModel):
    totalVolume: int
    totalVolumeDeltaPct: float
    completionRatePct: float
    completionRateDeltaPct: float
    activeFleet: int
    activeFleetDeltaPct: float
    exceptionRatePct: float
    exceptionRateDeltaPct: float

class HourlyTrendItem(BaseModel):
    hour: str
    target: int
    completed: int
    active: int

class TrendsResponse(BaseModel):
    date: str
    trends: List[HourlyTrendItem]
