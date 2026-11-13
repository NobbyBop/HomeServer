FROM python:3.15.2-slim

RUN apt update && apt install -y --no-install-recommends ffmpeg

COPY requirements.txt .
RUN pip install -r requirements.txt

WORKDIR /src

COPY src .

EXPOSE 8000

CMD ["fastapi", "run", "server.py"]