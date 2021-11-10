FROM python:3.9.7 as development

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY . .
RUN pip install pipenv && pipenv install --system

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
