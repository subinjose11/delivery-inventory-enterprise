from typing import Optional, List
from fastapi import APIRouter, Query
from app.schemas.delivery import DeliveryResponse, TrendsResponse
from app.services.delivery_service import delivery_service

router = APIRouter()

@router.get("/kpis")
def get_delivery_kpis(
    start_date: Optional[str] = Query(None, description="Start date YYYY-MM-DD"),
    end_date: Optional[str] = Query(None, description="End date YYYY-MM-DD"),
    date: Optional[str] = Query(None, description="Legacy single date or preset")
):
    return delivery_service.get_kpis(start_date=start_date, end_date=end_date, date=date)

@router.get("/trends", response_model=TrendsResponse)
def get_delivery_trends(
    start_date: Optional[str] = Query(None, description="Start date YYYY-MM-DD"),
    end_date: Optional[str] = Query(None, description="End date YYYY-MM-DD"),
    date: Optional[str] = Query(None, description="Legacy single date or preset")
):
    return delivery_service.get_trends(start_date=start_date, end_date=end_date, date=date)

@router.get("", response_model=List[DeliveryResponse])
def get_deliveries(
    status: Optional[str] = Query(None, description="Status filter: all, pending, in_transit, delivered, failed"),
    search: Optional[str] = Query(None, description="Search tracking number, recipient, address, driver"),
    start_date: Optional[str] = Query(None, description="Start date YYYY-MM-DD"),
    end_date: Optional[str] = Query(None, description="End date YYYY-MM-DD")
):
    return delivery_service.list_deliveries(status=status, search=search, start_date=start_date, end_date=end_date)

@router.get("/{delivery_id}", response_model=DeliveryResponse)
def get_delivery_by_id(delivery_id: str):
    return delivery_service.get_delivery(delivery_id)
