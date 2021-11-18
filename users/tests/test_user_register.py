from django.http import response
from django.test import TestCase
from ..models import User
from rest_framework import status
from rest_framework.test import APITestCase



class UserRegistrationTest(APITestCase):

    def setUp(self):
        User.objects.create_user(email="tony@mail.com", username="tony", name="tony", surname="tony", password="tony")


    def test_user_proper_registration(self):
        """Test proper user registration"""

        payload = {
            "username":"tom",
            "name":"tom",
            "surname":"tom",
            "email":"tomaaa@mail.com",
            "password":"tom"
        }

        response = self.client.post("/api/register/", payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    
    def test_user_invalid_data(self):
        """Test invalid registration data"""

        payload = {
            "usernameeeee":"tom",
            "name":"tom",
            "email":"tomaaa@mail.com",
            "password":"tom"
        }

        response = self.client.post("/api/register/", payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_user_already_exists(self):
        """Test user which already exists"""

        payload = {
            "username":"tony",
            "name":"tony",
            "surname":"tony",
            "email":"tony@mail.com",
            "password":"tony"
        }

        response = self.client.post("/api/register/", payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)