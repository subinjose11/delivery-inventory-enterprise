from typing import Generic, TypeVar, List
from pydantic import BaseModel, Field

T = TypeVar("T")

class PagedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    limit: int
    total_pages: int
