## Private Kindergarten Management System

## _System do zarządzania prywatnym przedszkolem_

---

Project implemented as a practical (project) part of BCs Thesis at the AGH University of Science and Technology

### Links

- my own graphical project [figma](https://www.figma.com/file/seayvAF8sO7c6hvBK6IHTC/Bs-Thesis?node-id=196%3A1002)
- BCs Thesis document [overleaf](https://www.overleaf.com/read/zkncvtqvkjpb)

---

### Required
- Node v. 16.10
- Docker
- Docker-compose
- Python 3.8

### How to run dev version?

Database
1. docker-compose up

Backend

1. Download repo and `cd into project dir`
2. `python3 -m venv my-venv`
3. `source my-venv/bin/activate`
4. `pip install -r requirements.txt`
5. `python manage.py migrate`
6. `python manage.py runserver`

Frontend

1. `cd frontend/`
2. `npm i`
3. `npm start`
