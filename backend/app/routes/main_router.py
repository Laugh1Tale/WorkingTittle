# app/routes/main_router.py

from fastapi import APIRouter
from app.routes.other_router import router as other_router
from app.routes.writing_router import router as writing_router

router = APIRouter()

# Определяем маршрут для метода "GET" по умолчанию "/"
@router.get("/")
async def read_root():
    return {"message": "Hello World from main app"}

router.include_router(other_router)
router.include_router(writing_router)

