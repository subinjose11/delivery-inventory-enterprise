from typing import Optional, List, Dict
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.schemas.common import PagedResponse
from app.services.product_service import product_service

router = APIRouter()

@router.get("", response_model=PagedResponse[ProductResponse])
def get_products(
    search: Optional[str] = Query(None, description="Search term for product name, SKU, or description"),
    category: Optional[str] = Query(None, description="Filter by category"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db)
):
    return product_service.list_products(db, search=search, category=category, page=page, limit=limit)

@router.get("/summary")
def get_inventory_summary(db: Session = Depends(get_db)):
    return product_service.get_inventory_summary(db)

@router.get("/categories", response_model=List[str])
def get_product_categories(db: Session = Depends(get_db)):
    return product_service.get_categories(db)

@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(
    payload: ProductCreate,
    db: Session = Depends(get_db)
):
    return product_service.create_product(db, payload)

@router.get("/{product_id}", response_model=ProductResponse)
def get_product_by_id(
    product_id: str,
    db: Session = Depends(get_db)
):
    return product_service.get_product(db, product_id)

@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: str,
    payload: ProductUpdate,
    db: Session = Depends(get_db)
):
    return product_service.update_product(db, product_id, payload)

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    product_id: str,
    db: Session = Depends(get_db)
):
    product_service.delete_product(db, product_id)
    return None
