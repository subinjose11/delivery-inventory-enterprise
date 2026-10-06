import math
from typing import Optional, List, Dict
from sqlalchemy.orm import Session
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate
from app.schemas.common import PagedResponse
from app.repositories.product_repo import product_repo
from app.core.exceptions import EntityNotFoundException, DuplicateSkuException

class ProductService:
    def list_products(
        self,
        db: Session,
        search: Optional[str] = None,
        category: Optional[str] = None,
        page: int = 1,
        limit: int = 10
    ) -> PagedResponse[dict]:
        page = max(1, page)
        limit = max(1, min(100, limit))
        skip = (page - 1) * limit

        items, total = product_repo.search_and_filter(
            db=db,
            search=search,
            category=category,
            skip=skip,
            limit=limit
        )

        total_pages = math.ceil(total / limit) if total > 0 else 1

        return PagedResponse(
            items=[item.to_dict() for item in items],
            total=total,
            page=page,
            limit=limit,
            total_pages=total_pages
        )

    def get_product(self, db: Session, product_id: str) -> dict:
        product = product_repo.get_by_id(db, product_id)
        if not product:
            raise EntityNotFoundException("Product", product_id)
        return product.to_dict()

    def create_product(self, db: Session, schema: ProductCreate) -> dict:
        existing = product_repo.get_by_sku(db, schema.sku)
        if existing:
            raise DuplicateSkuException(schema.sku)

        product = Product(
            name=schema.name,
            sku=schema.sku.upper(),
            category=schema.category,
            price=schema.price,
            quantity=schema.quantity,
            description=schema.description
        )
        created = product_repo.create(db, product)
        return created.to_dict()

    def update_product(self, db: Session, product_id: str, schema: ProductUpdate) -> dict:
        product = product_repo.get_by_id(db, product_id)
        if not product:
            raise EntityNotFoundException("Product", product_id)

        update_data = schema.model_dump(exclude_unset=True)

        if "sku" in update_data and update_data["sku"]:
            new_sku = update_data["sku"].strip().upper()
            if new_sku != product.sku:
                existing = product_repo.get_by_sku(db, new_sku)
                if existing and existing.id != product_id:
                    raise DuplicateSkuException(new_sku)
            update_data["sku"] = new_sku

        for field, value in update_data.items():
            setattr(product, field, value)

        updated = product_repo.update(db, product)
        return updated.to_dict()

    def delete_product(self, db: Session, product_id: str) -> None:
        product = product_repo.get_by_id(db, product_id)
        if not product:
            raise EntityNotFoundException("Product", product_id)
        product_repo.delete(db, product)

    def get_categories(self, db: Session) -> List[str]:
        return product_repo.get_categories(db)

    def get_inventory_summary(self, db: Session) -> Dict:
        return product_repo.get_summary(db)

product_service = ProductService()
