from django.http import response
from django.test import TestCase
from ..models import User
from rest_framework import status
from rest_framework.test import APITestCase



class UserLoginTest(APITestCase):

    def setUp(self):
        User.objects.create_user(email="mac@mail.com", username="mac", name="mac", surname="mac")
        User.objects.create_user(email="tony@mail.com", username="tony", name="tony", surname="tony", password="tony")

    
    def test_user_creation(self):
        """Test proper users creations"""

        mac = User.objects.get(name="mac")
        tony = User.objects.get(name="tony")
        self.assertEqual(mac.name, "mac")
        self.assertEqual(tony.name, "tony")


    def test_user_login(self):
        """Test proper user login"""

        payload = {
            "email":"tony@mail.com",
            "password":"tony"
        }
        response = self.client.post("/api/login/", payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    
    def test_user_login_error(self):
        """Test wrong user password"""

        payload = {
            "email":"tony@mail.com",
            "password":"ppp"
        }
        response = self.client.post("/api/login/", payload)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)