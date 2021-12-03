from django.http import response
from django.test import TestCase
from ..models import User, Todo
from rest_framework import status
from rest_framework.test import APITestCase
from ..serializers import TodoSerializer
from django.db.models import Q
from datetime import date






class UserTodosActionsTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(email="tony@mail.com", username="tony", name="tony", surname="tony", password="tony")
        Todo.objects.create(text="todo1",date="2021-11-29", user=self.user)
        Todo.objects.create(text="todo2",date="2021-11-29", user=self.user)
        Todo.objects.create(text="todo3",date="2021-12-01", user=self.user)



    def login(self):

        payload = {
            "email":"tony@mail.com",
            "password":"tony",
        }

        res = self.client.post("/api/login/", payload)

        return True



    def test_get_all_todos_from_curr_month(self):
        self.login()
        res = self.client.get("/api/todo/")
        today = date.today()
        result = Todo.objects.filter(Q(date__month=today.month))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), len(result))

    

    def test_get_all_todos_from_given_day(self):

        self.login()
        res = self.client.get("/api/todo/29/11/2021/")
        result = Todo.objects.filter(Q(date__month=11) & Q(date__day=29) & Q(date__year=2021))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), len(result))
        self.assertEqual(res.data[0]['id'], result[0].id)



    def test_try_get_all_todos_when_not_logged(self):
        res = self.client.get("/api/todo/")
        self.assertEqual(res.status_code, 401)



    def test_create_todo(self):

        self.login()

        payload = {
            "text":"tesst123",
            "date":"2021-11-29",
            "user":"1"
        }

        res = self.client.post("/api/todo/", payload)
        new_todo_id = res.data['id']
        result = Todo.objects.get(id=new_todo_id)

        self.assertEqual(res.status_code, 201)
        self.assertEqual(result.id, new_todo_id)
    


    def test_create_todo_when_not_logged(self):

        payload = {
            "text":"tesst123",
            "date":"2021-11-29",
            "user":"1"
        }

        res = self.client.post("/api/todo/", payload)
        self.assertEqual(res.status_code, 401)

    

    def test_delete_todo(self):
        self.login()
        res = self.client.delete("/api/todo/8")
        deleted_todo_id = res.data['id']
        result = Todo.objects.filter(Q(id = deleted_todo_id))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(result), 0)

    

    def test_try_delete_todo_which_not_exits(self):
        self.login()
        res = self.client.delete("/api/todo/1")
        self.assertEqual(res.status_code, 400)

    

    def test_try_delete_todo_when_not_logged(self):
        res = self.client.delete("/api/todo/1")
        self.assertEqual(res.status_code, 401)

        
        


