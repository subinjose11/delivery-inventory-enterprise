from fastapi import status

def test_create_product_success(client):
    payload = {
        "name": "Test Wireless Mouse",
        "sku": "TEST-MOU-001",
        "category": "Electronics",
        "price": 49.99,
        "quantity": 100,
        "description": "Ergonomic test mouse"
    }
    response = client.post("/api/v1/products", json=payload)
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["name"] == "Test Wireless Mouse"
    assert data["sku"] == "TEST-MOU-001"
    assert data["price"] == 49.99
    assert data["quantity"] == 100
    assert "id" in data
    assert "createdAt" in data

def test_create_product_duplicate_sku_conflict(client):
    payload = {
        "name": "Original Product",
        "sku": "DUP-SKU-999",
        "category": "Tools",
        "price": 20.00,
        "quantity": 10
    }
    res1 = client.post("/api/v1/products", json=payload)
    assert res1.status_code == status.HTTP_201_CREATED

    # Attempt to insert same SKU
    duplicate_payload = {
        "name": "Different Name Same SKU",
        "sku": "DUP-SKU-999",
        "category": "Tools",
        "price": 25.00,
        "quantity": 5
    }
    res2 = client.post("/api/v1/products", json=duplicate_payload)
    assert res2.status_code == status.HTTP_409_CONFLICT
    error_data = res2.json()
    assert "detail" in error_data
    assert "already exists" in error_data["detail"]["message"]

def test_create_product_validation_failure(client):
    # Negative price
    bad_payload = {
        "name": "Bad Price Product",
        "sku": "BAD-PRC-001",
        "category": "Test",
        "price": -10.0,
        "quantity": 5
    }
    response = client.post("/api/v1/products", json=bad_payload)
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    # Negative quantity
    bad_qty_payload = {
        "name": "Bad Qty Product",
        "sku": "BAD-QTY-001",
        "category": "Test",
        "price": 10.0,
        "quantity": -1
    }
    res_qty = client.post("/api/v1/products", json=bad_qty_payload)
    assert res_qty.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

def test_get_products_list_and_search(client):
    res = client.get("/api/v1/products")
    assert res.status_code == status.HTTP_200_OK
    data = res.json()
    assert "items" in data
    assert "total" in data
    assert "page" in data

def test_update_product(client):
    create_res = client.post("/api/v1/products", json={
        "name": "Before Edit",
        "sku": "EDIT-001",
        "category": "Misc",
        "price": 15.00,
        "quantity": 2
    })
    product_id = create_res.json()["id"]

    update_res = client.put(f"/api/v1/products/{product_id}", json={
        "name": "After Edit",
        "price": 22.50,
        "quantity": 10
    })
    assert update_res.status_code == status.HTTP_200_OK
    data = update_res.json()
    assert data["name"] == "After Edit"
    assert data["price"] == 22.50
    assert data["quantity"] == 10

def test_delete_product(client):
    create_res = client.post("/api/v1/products", json={
        "name": "To Be Deleted",
        "sku": "DEL-001",
        "category": "Temp",
        "price": 9.99,
        "quantity": 1
    })
    product_id = create_res.json()["id"]

    del_res = client.delete(f"/api/v1/products/{product_id}")
    assert del_res.status_code == status.HTTP_204_NO_CONTENT

    get_res = client.get(f"/api/v1/products/{product_id}")
    assert get_res.status_code == status.HTTP_404_NOT_FOUND
