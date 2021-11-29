from django.http import response
from django.test import TestCase
from ..models import User
from rest_framework import status
from rest_framework.test import APITestCase


class UserAuthTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(email="tony@mail.com", username="tony", name="tony", surname="tony", password="tony")

    
    def test_auth(self):
        """Test user authorized"""

        payload = {
            "email":"tony@mail.com",
            "password":"tony",
        }

        self.client.post("/api/login/", payload)

        response = self.client.post("/api/auth/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    
    def test_auth_error(self):
        """Test user unauthorized"""
        
        response = self.client.post("/api/auth/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    

    def test_auth_after_logout(self):
        """Test user login logout"""
        
        payload = {
            "email":"tony@mail.com",
            "password":"tony",
        }

        self.client.post("/api/login/", payload)
        self.client.post("/api/logout/")


        response = self.client.post("/api/auth/")
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)