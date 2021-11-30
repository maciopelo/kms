from django.http import response
from django.test import TestCase
from ..models import User
from kindergarten.models import Child, Group
from kindergarten.enums import GroupType
from rest_framework import status
from rest_framework.test import APITestCase


class UserChildrenTest(APITestCase):


    def setUp(self):
        
        group = Group.objects.create(name="group1", type=GroupType.YOUNGERS.value[0])

        Child.objects.create(
            group=group,
            name="John",
            surname="Doe",
            gender="M",
            date_of_birth="1999-11-11",
            pesel="99111198765",
            street="Kazimierza Wielkiego",
            house_number="12",
            city="Kraków", 
            coming_hour="8:00",
            leaving_hour="15:00"
        )

        Child.objects.create(
            group=group,
            name="Mary",
            surname="Doe",
            gender="M",
            date_of_birth="1999-11-11",
            pesel="99111198766",
            street="Kazimierza Wielkiego",
            house_number="12",
            city="Kraków", 
            coming_hour="8:00",
            leaving_hour="15:00"
        )

        children = Child.objects.all()

        user = User.objects.create_user(email="tony@mail.com", username="tony", name="tony", surname="tony", password="tony")
        user.children.set(children)


    def login(self):

        payload = {
            "email":"tony@mail.com",
            "password":"tony",
        }

        res = self.client.post("/api/login/", payload)

        return True

    
    def test_get_user_children(self):

        self.login()
        res = self.client.get("/api/parent/children/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 2)
        