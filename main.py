import json
from fastapi import FastAPI, Request, Response
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

import analyser

app = FastAPI()

app.mount('/static', StaticFiles(directory='static'), name='static')

templates = Jinja2Templates(directory='templates')


@app.get('/')
async def main(request: Request):
    return templates.TemplateResponse('index.html', {"request": request,
                                                     'mean_age': int(analyser.mean_age()),
                                                     'mean_gender': analyser.mean_gender()})


# @app.post('/analyse')
# async def analyse():
#     # return Response(
#     #     json.dumps({
#     #         'mean_age': int(analyser.mean_age())
#     #     }),
#     #     media_type='application/json'
#     # )
#     # return templates.TemplateResponse('in')