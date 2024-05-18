# - Количество заданий: 2 задания.
# - Продолжительность: 50 минут.
# - Типы заданий:
#   - Integrated task: Написание эссе на основе прочитанного текста и прослушанной лекции.
#   - Independent task: Написание эссе, выражающего и обосновывающего личное мнение по определенной теме.
# - Оценка: Оцениваются качество аргументации, структура, использование английского языка, правописание и грамматика.

from fastapi import FastAPI, HTTPException, Request, APIRouter
import openai
import os

router = APIRouter()

openai.api_key = os.getenv("OPENAI_API_KEY")

@router.post("/process")
async def process_request(request: Request):
    print("final_response")
    if 1:
        data = await request.json()
        print("final_response")

        # Отправка первого запроса на OpenAI API
        first_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": data["first_prompt"]}],
            max_tokens=100
        )
        first_output = first_response.choices[0].message["content"]
        
        # Генерация данных для второго запроса
        second_prompt = f"Generate follow-up based on: {first_output}"
        
        # Отправка второго запроса на OpenAI API
        second_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": second_prompt}],
            max_tokens=100
        )
        second_output = second_response.choices[0].message["content"]
        
        # Генерация итогового ответа
        final_response = f"First response: {first_output}\nSecond response: {second_output}"
        print("final_response")
        
        return {"result": final_response}

    #except Exception as e:
        #raise HTTPException(status_code=500, detail=str(e))