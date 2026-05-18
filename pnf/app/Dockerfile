FROM python

WORKDIR /app
COPY . .
RUN python -m venv .venv
RUN pip install jinja2 requests python-dotenv
EXPOSE 5555

CMD ["python3", "-u", "server.py"]
