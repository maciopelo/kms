from django.test import TestCase
from ..models import Group
from ..enums import GroupType
from users.models import User



class GroupsTest(TestCase):

    def setUp(self):
        self.teacher1 = User.objects.create_user(email="teacher1@mail.com", username="teacher1", name="teacher1", surname="teacher1", password="teacher1")
        self.teacher2 = User.objects.create_user(email="teacher2@mail.com", username="teacher2", name="teacher2", surname="teacher2", password="teacher2")
        Group.objects.create(teacher=self.teacher1, name="youngers")
        Group.objects.create(teacher=self.teacher2, name="middlers", type=GroupType.MIDDLES.value[0])


    def login(self):

        payload = {
            "email":"teacher1@mail.com",
            "password":"teacher1",
        }

        res = self.client.post("/api/login/", payload)

        return True
    

    def test_group_creation(self):

        youngers = Group.objects.get(name="youngers")
        middlers = Group.objects.get(name="middlers")

        self.assertEquals(youngers.teacher, self.teacher1 )
        self.assertEquals(middlers.teacher, self.teacher2 )
        self.assertEquals(youngers.type, GroupType.YOUNGERS.value[0])
        self.assertEquals(middlers.type, GroupType.MIDDLES.value[0])

    

    def test_get_all_groups(self):
        self.login()

        res = self.client.get("/api/group/")
        result = Group.objects.all()
        self.assertEqual(len(res.data), len(result))

    
    def test_get_all_groups_when_not_logged(self):

        res = self.client.get("/api/group/")
        self.assertEqual(res.status_code, 401)

