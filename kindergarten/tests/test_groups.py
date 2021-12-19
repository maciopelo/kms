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
            "username":"teacher1",
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

    
    def test_post_new_group(self):

        self.login()

        new_group_payload = {
            "name": "Group123",
            "type": GroupType.MIDDLES.value[0],
            "children":[],
            'teacher':None
        }
    
        res = self.client.post("/api/group/", data=new_group_payload, content_type='application/json')
        
    
        group = Group.objects.get(name="Group123")
        children = Group.objects.all()

        self.assertEqual(res.data['name'], group.name)
        self.assertEqual(len(children), 3)

    

    def test_delete_existing_group(self):

        self.login()

        groups = Group.objects.all()
        group = groups.first()

        res = self.client.delete(f'/api/group/{group.id}')

        self.assertEqual(len(groups), 1)
        self.assertEqual(res.data['name'], group.name)

    
    def test_delete_group_which_not_exist(self):
    
        self.login()

        res = self.client.delete('/api/group/19227')

        self.assertEqual(res.status_code, 404)
        self.assertEqual(res.data['msg'], "Group with given id does not exist.")


    
    def test_patch_group(self):
        
        self.login()

        update_group_payload = {
            "name": "New Group Name",
            "type": GroupType.MIDDLES.value[0],
            "children":[],
            'teacher':None
        }

        groups = Group.objects.all()
        group = groups.first()

        res = self.client.patch(f"/api/group/{group.id}",data=update_group_payload, content_type='application/json')

        updated_group = groups.first()

  
        self.assertEqual(len(groups), 2)
        self.assertEqual(res.data['name'],"New Group Name")
        self.assertEqual(updated_group.name, "New Group Name")
        self.assertEqual(updated_group.type, GroupType.MIDDLES.value[0])
        self.assertEqual(updated_group.teacher, None)

