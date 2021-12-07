from django.test import TestCase
from ..models import Group, Announcement, Child
from ..enums import GroupType
from users.models import User
from django.db.models import Q
from datetime import date





class AnnouncementsTest(TestCase):

    def setUp(self):
        self.teacher1 = User.objects.create_user(email="teacher1@mail.com", username="teacher1", name="teacher1", surname="teacher1", password="teacher1")
        self.teacher2 = User.objects.create_user(email="teacher2@mail.com", username="teacher2", name="teacher2", surname="teacher2", password="teacher2")
        self.group1 = Group.objects.create(teacher=self.teacher1, name="youngers")
        self.group2 =Group.objects.create(teacher=self.teacher2, name="middlers", type=GroupType.MIDDLES.value[0])

        Child.objects.create(
            name="Twitch",
            surname="Twitch",
            gender= "M",
            additional_info="bbbb",
            date_of_birth= "1673-01-03",
            pesel= "12927999238",
            eats_breakfast= True,
            eats_dinner= True,
            eats_supper= True,
            street= "Pipes",
            house_number= "3f",
            city= "Zaun",
            coming_hour= "04:00:00",
            leaving_hour= "18:30:00",
            group=self.group1
        )

        Child.objects.create(
            name="Tom",
            surname="Tom",
            gender= "M",
            date_of_birth= "1473-01-03",
            pesel= "11111199238",
            eats_breakfast= True,
            eats_dinner= False,
            eats_supper= False,
            street= "Donw",
            house_number= "1d",
            city= "Kraków",
            coming_hour= "07:00:00",
            leaving_hour= "13:30:00",
            group= self.group1
        )

        Child.objects.create(
            name="Kate",
            additional_info="aaaaa",
            surname="Kate",
            gender= "F",
            date_of_birth= "1999-01-03",
            pesel= "12345678902",
            eats_breakfast= True,
            eats_dinner= False,
            eats_supper= True,
            street= "Podaq",
            house_number= "123d",
            city= "Xinox",
            coming_hour= "07:30:00",
            leaving_hour= "12:30:00",
            group= self.group2,
 
        )

    def login(self):

        payload = {
            "username":"teacher1",
            "password":"teacher1",
        }

        res = self.client.post("/api/login/", payload)

        return True
    
    

    def test_get_all_children(self):

        self.login()

        res = self.client.get('/api/children/')
        children = Child.objects.all()

        self.assertEqual(len(res.data), len(children))
        self.assertEqual(res.data[0]['name'], "Twitch")


    
    def test_get_all_children_when_not_logged(self):

        res = self.client.get('/api/children/')
        self.assertEqual(res.status_code, 401)
    


    def test_post_new_child(self):

        self.login()

        new_child_payload = {
            "name": "Ann",
            "surname": "Ann",
            "gender": "F",
            "date_of_birth": "1373-01-03",
            "pesel": "10027999238",
            "eats_breakfast": True,
            "eats_dinner": False,
            "eats_supper": True,
            "street": "Pipes",
            "house_number": "3f",
            "city": "Zaun",
            "coming_hour": "04:00:00",
            "leaving_hour": "18:30:00",
            "group": self.group1.id
        }

        res = self.client.post('/api/children/',data=new_child_payload,content_type='application/json')
        child = Child.objects.get(pesel=10027999238)
        children = Child.objects.all()

        self.assertEqual(res.data['name'], child.name)
        self.assertEqual(res.data['pesel'], child.pesel)
        self.assertEqual(len(children), 4)

    
    def test_try_post_new_child_with_wrong_pesel(self):

        self.login()

        new_child_payload = {
            "name": "Ann",
            "surname": "Ann",
            "gender": "F",
            "date_of_birth": "1373-01-03",
            "pesel": "100279",
            "eats_breakfast": True,
            "eats_dinner": False,
            "eats_supper": True,
            "street": "Pipes",
            "house_number": "3f",
            "city": "Zaun",
            "coming_hour": "04:00:00",
            "leaving_hour": "18:30:00",
            "group": self.group1.id
        }

        res = self.client.post('/api/children/',data=new_child_payload,content_type='application/json')

        self.assertEqual(res.status_code, 400)
        self.assertEqual(res.data['pesel'][0], "Pesel must consists of 11 characters.")

    
    def test_try_post_child_which_already_exists(self):

        self.login()
        children = Child.objects.all()

         # Twitch child uses that pesel number
        new_child_payload = {
            "name": "Ann",
            "surname": "Ann",
            "gender": "F",
            "date_of_birth": "1373-01-03",
            "pesel": "12927999238",
            "eats_breakfast": True,
            "eats_dinner": False,
            "eats_supper": True,
            "street": "Pipes",
            "house_number": "3f",
            "city": "Zaun",
            "coming_hour": "04:00:00",
            "leaving_hour": "18:30:00",
            "additional_info":"loves mould",
            "group": self.group1.id
        }

        res = self.client.post('/api/children/',data=new_child_payload,content_type='application/json')

        self.assertEqual(res.status_code, 400)
        self.assertEqual(res.data['pesel'][0], "Child with this pesel already exists.")

    

    def test_delete_child(self):

        self.login()

        children = Child.objects.all()
        child = children.first()

        res = self.client.delete(f'/api/children/{child.id}')

        self.assertEqual(len(children), 2)
        self.assertEqual(res.data['name'], child.name)

    

    def test_delete_child_who_not_exist(self):

        self.login()

        res = self.client.delete(f'/api/children/1927')

        self.assertEqual(res.status_code, 404)
        self.assertEqual(res.data['msg'], "Child with given id does not exist.")
    



    def test_update_child(self):

        self.login()

        children = Child.objects.all()
        child = Child.objects.get(name="Twitch")

        update_child_payload = {
            "name": "Twitch",
            "surname": "Twitch",
            "gender": "M",
            "date_of_birth": "1673-01-03",
            "pesel": "12927999238",
            "eats_breakfast": False,
            "eats_dinner": False,
            "eats_supper": False,
            "street": "Pipes123",
            "house_number": "3ffff",
            "city": "Zaun",
            "coming_hour": "04:00:00",
            "leaving_hour": "12:30:00",
            "group": self.group1.id
        }


        res = self.client.put(f'/api/children/{child.id}',update_child_payload,content_type="application/json")

        updated_child = Child.objects.get(name="Twitch")

        self.assertEqual(res.data['street'], updated_child.street)
        self.assertEqual(res.data['eats_supper'], updated_child.eats_supper)
        self.assertEqual(len(children), 3)


    def test_update_child_who_not_exists(self):

        self.login()

        

        update_child_payload = {
            "name": "Twitch",
            "surname": "Twitch",
            "gender": "M",
            "date_of_birth": "1673-01-03",
            "pesel": "12927999238",
            "eats_breakfast": False,
            "eats_dinner": False,
            "eats_supper": False,
            "street": "Pipes123",
            "house_number": "3ffff",
            "city": "Zaun",
            "coming_hour": "04:00:00",
            "leaving_hour": "12:30:00",
            "group": self.group1.id
        }


        res = self.client.put(f'/api/children/19999',update_child_payload,content_type="application/json")

        self.assertEqual(res.status_code, 404)
        self.assertEqual(res.data['msg'], "Child with given id does not exist.")

    
    def test_update_child_with_wrong_pesel(self):

        self.login()

        child = Child.objects.get(name="Twitch")

        update_child_payload = {
            "name": "Twitch",
            "surname": "Twitch",
            "gender": "M",
            "date_of_birth": "1673-01-03",
            "pesel": "1292",
            "eats_breakfast": False,
            "eats_dinner": False,
            "eats_supper": False,
            "street": "Pipes123",
            "house_number": "3ffff",
            "city": "Zaun",
            "coming_hour": "04:00:00",
            "leaving_hour": "12:30:00",
            "group": self.group1.id
        }


        res = self.client.put(f'/api/children/{child.id}',update_child_payload,content_type="application/json")

        self.assertEqual(res.status_code, 400)
        self.assertEqual(res.data['pesel'][0], "Pesel must consists of 11 characters.")



  
