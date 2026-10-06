from fastapi import APIRouter
from app.api.v1.endpoints import products, deliveries

api_router = APIRouter()
api_router.include_router(products.router, prefix="/products", tags=["Inventory Management"])
api_router.include_router(deliveries.router, prefix="/deliveries", tags=["Delivery Operations"])
