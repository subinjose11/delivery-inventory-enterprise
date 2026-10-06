from sqlalchemy import Column, String, Float, Integer, Text, CheckConstraint
from app.core.database import Base
from app.db.base import TimestampMixin, generate_uuid

class Product(Base, TimestampMixin):
    __tablename__ = "products"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    name = Column(String(255), nullable=False, index=True)
    sku = Column(String(64), nullable=False, unique=True, index=True)
    category = Column(String(64), nullable=False, index=True)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
    description = Column(Text, nullable=True)

    __table_args__ = (
        CheckConstraint("price > 0", name="check_positive_price"),
        CheckConstraint("quantity >= 0", name="check_non_negative_quantity"),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "sku": self.sku,
            "category": self.category,
            "price": self.price,
            "quantity": self.quantity,
            "description": self.description,
            "createdAt": self.created_at.isoformat() if self.created_at else None,
            "updatedAt": self.updated_at.isoformat() if self.updated_at else None,
        }
