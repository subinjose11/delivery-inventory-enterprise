from fastapi import status

def test_get_deliveries_kpis(client):
    res = client.get("/api/v1/deliveries/kpis")
    assert res.status_code == status.HTTP_200_OK
    data = res.json()
    assert "totalVolume" in data
    assert "completionRatePct" in data
    assert "activeFleet" in data
    assert "exceptionRatePct" in data

def test_get_deliveries_trends(client):
    res = client.get("/api/v1/deliveries/trends")
    assert res.status_code == status.HTTP_200_OK
    data = res.json()
    assert "trends" in data
    assert len(data["trends"]) > 0
    assert "hour" in data["trends"][0]
    assert "completed" in data["trends"][0]

def test_get_deliveries_list(client):
    res = client.get("/api/v1/deliveries")
    assert res.status_code == status.HTTP_200_OK
    data = res.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "trackingNumber" in data[0]

def test_get_delivery_detail(client):
    res = client.get("/api/v1/deliveries")
    first_id = res.json()[0]["id"]

    detail_res = client.get(f"/api/v1/deliveries/{first_id}")
    assert detail_res.status_code == status.HTTP_200_OK
    detail_data = detail_res.json()
    assert detail_data["id"] == first_id
    assert "timeline" in detail_data
    assert len(detail_data["timeline"]) > 0

def test_get_delivery_not_found(client):
    res = client.get("/api/v1/deliveries/non-existent-id")
    assert res.status_code == status.HTTP_404_NOT_FOUND
