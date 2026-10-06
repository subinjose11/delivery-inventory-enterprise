from typing import Optional, List, Dict
from app.data.mock_deliveries import MOCK_DELIVERIES

class DeliveryRepository:

    def __init__(self):
        self._deliveries: List[Dict] = list(MOCK_DELIVERIES)

    def get_by_id(self, delivery_id: str) -> Optional[Dict]:
        for d in self._deliveries:
            if d.get("id") == delivery_id:
                return d
        return None

    def get_by_tracking_number(self, tracking_number: str) -> Optional[Dict]:
        for d in self._deliveries:
            if d.get("trackingNumber") == tracking_number:
                return d
        return None

    def filter_deliveries(
        self,
        status: Optional[str] = None,
        search: Optional[str] = None,
        start_date: Optional[str] = None,
        end_date: Optional[str] = None
    ) -> List[Dict]:
        results = self._deliveries

        if status and status.lower() != "all":
            norm_status = status.lower()
            results = [d for d in results if d.get("status", "").lower() == norm_status]

        if search:
            term = search.strip().lower()
            results = [
                d for d in results
                if term in d.get("trackingNumber", "").lower()
                or term in d.get("recipientName", "").lower()
                or term in d.get("address", "").lower()
                or term in (d.get("driverName") or "").lower()
            ]

        return results

    def get_kpis(self) -> Dict:
        total = len(self._deliveries)
        delivered = sum(1 for d in self._deliveries if d.get("status") == "delivered")
        in_transit = sum(1 for d in self._deliveries if d.get("status") == "in_transit")
        failed = sum(1 for d in self._deliveries if d.get("status") == "failed")
        pending = sum(1 for d in self._deliveries if d.get("status") == "pending")

        completion_rate = round((delivered / total * 100), 1) if total > 0 else 0.0
        exception_rate = round((failed / total * 100), 1) if total > 0 else 0.0

        return {
            "totalVolume": total,
            "totalVolumeDeltaPct": 12.5,
            "completionRatePct": completion_rate,
            "completionRateDeltaPct": 3.2,
            "activeFleet": in_transit,
            "activeFleetDeltaPct": -2.4,
            "exceptionRatePct": exception_rate,
            "exceptionRateDeltaPct": -0.8,
            "countsByStatus": {
                "all": total,
                "in_transit": in_transit,
                "delivered": delivered,
                "failed": failed,
                "pending": pending
            }
        }

delivery_repo = DeliveryRepository()
