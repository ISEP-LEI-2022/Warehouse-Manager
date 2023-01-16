FROM python:3.10
WORKDIR /code

COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
RUN pip uninstall uvicorn
RUN pip install uvicorn[standard]

COPY main.py /code/

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5151", "--forwarded-allow-ips='*'", "--proxy-headers", "--reload"]