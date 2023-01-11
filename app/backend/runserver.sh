#!/bin/bash

python3 -m venv "env"

source "env/bin/activate"

pip install -r "requirements.txt"

python3 manage.py "makemigrations"

python3 manage.py "migrate"

python3 manage.py createsuperuser --noinput

python3 manage.py runserver 0.0.0.0:8000
lo