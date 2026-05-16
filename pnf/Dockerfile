FROM python

WORKDIR /app
COPY . .
RUN python -m venv .venv
RUN pip install jinja2 
EXPOSE 5555

RUN ["python" "server.py"]
