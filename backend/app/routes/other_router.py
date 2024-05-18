from fastapi import APIRouter, FastAPI, File, UploadFile, Response
from fastapi.responses import FileResponse
from typing import BinaryIO
import os

router = APIRouter()

# Создаем отдельный экземпляр APIRouter для вложенных роутов
nested_router = APIRouter()

# Определяем маршрут для метода "GET" по умолчанию "/router"
@nested_router.get("/")
async def read_root_from_router():
    return {"message": "Hello World from nested router"}

# Регистрируем вложенный роутер с префиксом "/router" в основном роутере

AUDIO_FILE_PATH = "./speech.mp3"

@nested_router.get("/audio/download/")
async def download_audio_file(response: Response):
    return FileResponse(path="./speech.mp3", filename='audio-responce.mp3', media_type='multipart/form-data')

@nested_router.post("/audio/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join("./files_request", file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    return FileResponse(path="./files_responce/audio-responce.mp3", filename='audio-responce.mp3', media_type='multipart/form-data')
    
router.include_router(nested_router, prefix="/router")