FROM python:3.15.2-slim

COPY requirements.txt .
RUN pip install -r requirements.txt

WORKDIR /src

COPY src .

EXPOSE 8001

CMD ["fastapi", "run", "server.py", "--port", "8001"]