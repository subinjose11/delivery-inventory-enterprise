from typing import Optional, Tuple, List, Dict
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.product import Product

class ProductRepository:

    def get_by_id(self, db: Session, product_id: str) -> Optional[Product]:
        return db.query(Product).filter(Product.id == product_id).first()

    def get_by_sku(self, db: Session, sku: str) -> Optional[Product]:
        return db.query(Product).filter(Product.sku.ilike(sku.strip())).first()

    def create(self, db: Session, product: Product) -> Product:
        db.add(product)
        db.commit()
        db.refresh(product)
        return product

    def update(self, db: Session, product: Product) -> Product:
        db.add(product)
        db.commit()
        db.refresh(product)
        return product

    def delete(self, db: Session, product: Product) -> None:
        db.delete(product)
        db.commit()

    def search_and_filter(
        self,
        db: Session,
        search: Optional[str] = None,
        category: Optional[str] = None,
        skip: int = 0,
        limit: int = 20
    ) -> Tuple[List[Product], int]:
        query = db.query(Product)

        if category and category.lower() != "all":
            query = query.filter(Product.category.ilike(category.strip()))

        if search:
            search_term = f"%{search.strip()}%"
            query = query.filter(
                or_(
                    Product.name.ilike(search_term),
                    Product.sku.ilike(search_term),
                    Product.category.ilike(search_term),
                    Product.description.ilike(search_term)
                )
            )

        total = query.count()
        products = query.order_by(Product.updated_at.desc()).offset(skip).limit(limit).all()
        return products, total

    def get_categories(self, db: Session) -> List[str]:
        results = db.query(Product.category).distinct().all()
        return sorted([r[0] for r in results if r[0]])

    def get_summary(self, db: Session) -> Dict:
        products = db.query(Product).all()
        total_items = len(products)
        total_valuation = sum(p.price * p.quantity for p in products)
        low_stock_count = sum(1 for p in products if 0 < p.quantity <= 5)
        out_of_stock_count = sum(1 for p in products if p.quantity == 0)
        return {
            "total": total_items,
            "totalValuation": round(total_valuation, 2),
            "lowStockCount": low_stock_count,
            "outOfStockCount": out_of_stock_count
        }

product_repo = ProductRepository()
