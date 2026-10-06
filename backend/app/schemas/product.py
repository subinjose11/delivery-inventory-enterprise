from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, field_validator

class ProductBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255, description="Product name (required)")
    sku: str = Field(..., min_length=2, max_length=64, description="Product SKU (required, unique)")
    category: str = Field(..., min_length=1, max_length=64, description="Product category (required)")
    price: float = Field(..., gt=0, description="Product price must be a positive number (> 0)")
    quantity: int = Field(..., ge=0, description="Product quantity must be non-negative integer (>= 0)")
    description: Optional[str] = Field(None, max_length=2000, description="Optional description")

    @field_validator("name", "sku", "category")
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        stripped = v.strip()
        if not stripped:
            raise ValueError("Field cannot be empty or only whitespace")
        return stripped

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    sku: Optional[str] = Field(None, min_length=2, max_length=64)
    category: Optional[str] = Field(None, min_length=1, max_length=64)
    price: Optional[float] = Field(None, gt=0)
    quantity: Optional[int] = Field(None, ge=0)
    description: Optional[str] = Field(None, max_length=2000)

class ProductResponse(BaseModel):
    id: str
    name: str
    sku: str
    category: str
    price: float
    quantity: int
    description: Optional[str] = None
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True
        populate_by_name = True
