FROM python

WORKDIR /app
COPY . .
RUN python -m venv .venv
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 5555

CMD ["python3", "-u", "server.py"]
