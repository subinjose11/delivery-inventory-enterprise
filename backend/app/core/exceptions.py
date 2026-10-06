from fastapi import HTTPException, status

class EntityNotFoundException(HTTPException):
    def __init__(self, entity_name: str, entity_id: str):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{entity_name} with ID '{entity_id}' not found."
        )

class DuplicateSkuException(HTTPException):
    def __init__(self, sku: str):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "message": f"Product with SKU '{sku}' already exists. SKU must be unique across all inventory items.",
                "field": "sku",
                "conflicting_value": sku
            }
        )

class BusinessRuleViolationException(HTTPException):
    def __init__(self, message: str):
        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={"message": message}
        )
