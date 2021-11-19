from django.http import response
from django.test import TestCase
from ..models import User
from rest_framework import status
from rest_framework.test import APITestCase


class UserAuthTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(email="tony@mail.com", username="tony", name="tony", surname="tony", password="tony")

        payload = {
            "email":f"{self.user.email}",
            "password":f"{self.user.email}"
        }

        response = self.client.post("/api/login/", payload)
        self.token = response.cookies.get('jwt')

    

