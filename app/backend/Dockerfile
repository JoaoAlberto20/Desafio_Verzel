FROM python:3.10

ENV PYTHONUNBUFFERED=1

WORKDIR /app-backend

COPY requirements.txt .

COPY . . 

EXPOSE 8000

CMD [ "./runserver.sh" ]