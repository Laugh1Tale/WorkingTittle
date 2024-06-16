# from pathlib import Path
# from openai import OpenAI
# client = OpenAI()

# response = client.audio.speech.create(
#   model="tts-1",
#   voice="alloy",
#   input="Today is a wonderful day to build something people love!"
# )

# file_name = "speech.mp3"
# response.stream_to_file(file_name)

# audio_file= open("./speech.mp3", "rb")
# transcription = client.audio.transcriptions.create(
#   model="whisper-1", 
#   file=audio_file
# )
# print(transcription.text)





# from fastapi import FastAPI
# from app.routes.main_router import router as main_router
# from app.routes.other_router import router as other_router

# app = FastAPI()

# # Регистрируем основной роутер в приложении
# app.include_router(main_router)


from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from typing import List
from openai import OpenAI
import os
import json
from fastapi.middleware.cors import CORSMiddleware
import random
from fastapi.responses import FileResponse

os.environ["OPENAI_API_KEY"] = "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"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Можно изменить на список доменов для повышения безопасности
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Установите API ключ
client = OpenAI(
    api_key = os.getenv("OPENAI_API_KEY"),
)

# Определите Pydantic модель для запроса
class RequestModel(BaseModel):
    first_prompt: str

@app.post("/process")
async def process_request(request_data: RequestModel):
    try:
        # Получение данных из модели запроса
        first_prompt = request_data.first_prompt

        # Отправка первого запроса на OpenAI API
        first_response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[{"role": "user", "content": first_prompt}],
            max_tokens=100
        )
        first_output = first_response.choices[0].message.content
        
        # Генерация данных для второго запроса
        second_prompt = f"Generate follow-up based on: {first_output}"
        

        # Отправка второго запроса на OpenAI API
        second_response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[{"role": "user", "content": second_prompt}],
            max_tokens=100
        )
        second_output = second_response.choices[0].message.content
        
        # Генерация итогового ответа
        final_response = f"First response: {first_output}\nSecond response: {second_output}"
        
        return {"result": final_response}

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print("Exception occurred:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
    
class Question(BaseModel):
    question: str
    options: List[str]
    correctAnswer: str
    explanation: str

class TextQuestions(BaseModel):
    text: str
    questionData: List[Question]

@app.get("/reading", response_model=TextQuestions)
async def get_questions():
    try:
        prompt = "сгенерируй текст на английском языке примерно на 400 слов Темы: Академические текст по различным дисциплинам \
            (естественные науки, социальные науки, бизнес, искусства и т.д.).на примерно такие темы, \
            так же Сгенерируй 10 тестовых вопросов по данному тексту. \
            вопросы на определение лексического значения слов в контексте, нахождение деталей, \
            понимание структуры текста и выделение основной идеи. \
            К каждому вопросу добавь тестовые варианты ответа на него, \
            правильный вариант ответа на него, а так же объяснение почему именно этот вариант ответа правильный \
            в качестве ответа пришли мне json со следующей структурой, чтобы при этом я мог сразу передать его на клиентскую сторону:" + '''
{ 
  "text": "long text in English...", 
  "questionData": [ 
    { 
      "question": "What is the capital of France?", 
      "options": ["Paris", "London", "Berlin", "Madrid"], 
      "correctAnswer": "Paris", 
      "explanation": "Париж - столица и самый густонаселенный город Франции." 
    }, 
  ] 
}
'''
        
        # Отправка первого запроса на OpenAI API
        first_response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=4096
        )
        questions = first_response.choices[0].message.content
        responce = json.loads(questions)
        return responce
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print("Exception occurred:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/listening", response_model=TextQuestions)
async def get_questions():
    try:
        prompt = "сгенерируй текст на английском языке примерно на 300 слов Темы: содержание может варьироваться \
            от обсуждения академических тем до повседневных ситуаций, таких как покупка товаров в магазине или обсуждение планов на выходные.\
            Лекции учителей или студентов, интервью с профессионалами, беседы между друзьями и многое другое. \
            То есть это может быть как текст в формате диалога формата (-hi.   -hi, how are you? ...). \
            Так и Академические текст по различным дисциплинам \
            (естественные науки, социальные науки, бизнес, искусства и т.д.) \
            так же Сгенерируй 10 тестовых вопросов по данному тексту. \
            вопросы могут содержать выбор правильного ответа, соотнесение информации, \
            заполнение пропусков, уточнение деталей и т.д. Вопросы могут требовать понимания основной идеи высказывания, \
            деталей, отношений между людьми, местами и событиями, а также логического вывода на основе прочитанной информации. \
            К каждому вопросу добавь тестовые варианты ответа на него, \
            правильный вариант ответа на него, а так же объяснение почему именно этот вариант ответа правильный \
            в качестве ответа пришли мне json со следующей структурой, чтобы при этом я мог сразу передать его на клиентскую сторону:" + '''
{ 
  "text": "long text in English...", 
  "questionData": [ 
    { 
      "question": "What is the capital of France?", 
      "options": ["Paris", "London", "Berlin", "Madrid"], 
      "correctAnswer": "Paris", 
      "explanation": "Париж - столица и самый густонаселенный город Франции." 
    }, 
  ] 
}
'''
        
        # Отправка первого запроса на OpenAI API
        first_response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=4096
        )
        questions = first_response.choices[0].message.content
        responce = json.loads(questions)
        print(responce)
        return responce
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print("Exception occurred:", str(e))
        raise HTTPException(status_code=500, detail=str(e))


class Text(BaseModel):
    text: str


@app.post("/listening/audio", response_model=Text)
async def get_questions(request: Text):
    print(request.text)
    response = client.audio.speech.create(
    model="tts-1",
    voice="alloy",
    input=request.text
    )

    random_number = random.randint(1, 1000)

    file_name = "files_responce/audio-responce" + str(random_number) + ".mp3"
    with open(file_name, 'w') as file:
        response.stream_to_file(file_name)

    audio_file= open(file_name, "rb")
    transcription = client.audio.transcriptions.create(
    model="whisper-1", 
    file=audio_file
    )
    print(transcription.text)
    return FileResponse(path=file_name, filename="audio-responce" + str(random_number) + ".mp3", media_type='multipart/form-data')

@app.get("/writing", response_model=Text)
async def get_questions():
    try:
        prompt = "сгенерируй академический текст на английском языке примерно на 300 слов \
            (естественные науки, социальные науки, бизнес, искусства и т.д.) \
            в качестве ответа пришли мне json со следующей структурой, чтобы при этом я мог сразу передать его на клиентскую сторону:" + '''
{ 
  "text": "long text in English...", 
}
'''
        
        # Отправка первого запроса на OpenAI API
        first_response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=4096
        )
        questions = first_response.choices[0].message.content
        responce = json.loads(questions)
        print(responce)
        return responce
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print("Exception occurred:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
    

class Check(BaseModel):
    topic: str
    essay: str

@app.post("/writing/check", response_model=Text)
async def get_questions(request: Check):
    try:
        prompt = " Вот текст, по которому я писал эссе: \"" + request.topic + "\" . Вот эссе которое я написал: \"" + request.essay + "\" Можешь ли ты оценить \
            мое эссе по следующим критериям: - Качество и развитие идей: \
           способность выражать и поддерживать аргументы, предоставлять детали и примеры.\
        - Организация письма: четкость структуры эссе, включая введение, основные абзацы и заключение. \
        - Использование языка: грамматика, лексика, правильное использование синтаксических конструкций, орфография и пунктуация. \
        - Связность: использование связующих слов и фраз для обеспечения плавности перехода между идеями и абзацами. \
            Так же проверяй все аспекты грамматики, а после пришли подробный отчет по всем моим ошибкам и недочетам, где можно было сделать лучше. \
            в качестве ответа пришли мне json со следующей структурой, чтобы при этом я мог сразу передать его на клиентскую сторону: " + '''
{ 
  "text": "long text in English...", 
}
'''
        print(prompt)
        # Отправка первого запроса на OpenAI API
        first_response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=4096
        )
        questions = first_response.choices[0].message.content
        responce = json.loads(questions)
        print(responce)
        return responce
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print("Exception occurred:", str(e))
        raise HTTPException(status_code=500, detail=str(e))


class Text(BaseModel):
    text: str