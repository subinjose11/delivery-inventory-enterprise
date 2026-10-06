from typing import Optional, List, Dict
from app.repositories.delivery_repo import delivery_repo
from app.core.exceptions import EntityNotFoundException

class DeliveryService:
    def list_deliveries(
        self,
        status: Optional[str] = None,
        search: Optional[str] = None,
        start_date: Optional[str] = None,
        end_date: Optional[str] = None
    ) -> List[dict]:
        return delivery_repo.filter_deliveries(
            status=status,
            search=search,
            start_date=start_date,
            end_date=end_date
        )

    def get_delivery(self, delivery_id: str) -> dict:
        delivery = delivery_repo.get_by_id(delivery_id)
        if not delivery:
            raise EntityNotFoundException("Delivery", delivery_id)
        return delivery

    def get_kpis(
        self,
        start_date: Optional[str] = None,
        end_date: Optional[str] = None,
        date: Optional[str] = None
    ) -> Dict:
        kpis = delivery_repo.get_kpis()
        kpis["dateRange"] = {
            "startDate": start_date,
            "endDate": end_date,
            "preset": date or "Custom"
        }
        return kpis

    def get_trends(
        self,
        start_date: Optional[str] = None,
        end_date: Optional[str] = None,
        date: Optional[str] = None
    ) -> Dict:
        trends = [
            {"hour": "08:00", "target": 12, "completed": 10, "active": 4},
            {"hour": "10:00", "target": 25, "completed": 24, "active": 8},
            {"hour": "12:00", "target": 40, "completed": 38, "active": 12},
            {"hour": "14:00", "target": 60, "completed": 58, "active": 10},
            {"hour": "16:00", "target": 75, "completed": 71, "active": 7},
            {"hour": "18:00", "target": 90, "completed": 86, "active": 5},
            {"hour": "20:00", "target": 100, "completed": 95, "active": 2},
        ]
        return {
            "date": f"{start_date} to {end_date}" if (start_date and end_date) else (date or "Selected Range"),
            "trends": trends
        }

delivery_service = DeliveryService()
