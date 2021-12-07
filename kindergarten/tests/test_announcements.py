from django.test import TestCase
from ..models import Group, Announcement
from ..enums import GroupType
from users.models import User
from django.db.models import Q
from datetime import date





class AnnouncementsTest(TestCase):

    def setUp(self):
        self.teacher1 = User.objects.create_user(email="teacher1@mail.com", username="teacher1", name="teacher1", surname="teacher1", password="teacher1")
        self.teacher2 = User.objects.create_user(email="teacher2@mail.com", username="teacher2", name="teacher2", surname="teacher2", password="teacher2")
        self.group1 = Group.objects.create(teacher=self.teacher1, name="youngers")
        self.group2 = Group.objects.create(teacher=self.teacher2, name="middlers", type=GroupType.MIDDLES.value[0])
        Announcement.objects.create(group=self.group1, text="Please bring crayons")
        Announcement.objects.create(group=self.group2, text="On 4th December parents meeting", is_for_all=True)
        Announcement.objects.create(group=self.group2, text="Another announcement", is_for_all=True, date=date.today())


    def login(self):

        payload = {
            "username":"teacher1",
            "password":"teacher1",
        }

        res = self.client.post("/api/login/", payload)

        return True
    

    def test_group_creation(self):

        announcements = Announcement.objects.all()

        self.assertEquals(len(announcements), 3)
        self.assertEquals(announcements[0].text, "Please bring crayons")
        self.assertEquals(announcements[1].is_for_all, True)
        self.assertEquals(announcements[1].date, None)



    def test_get_all_announcements(self):
        self.login()
        today = date.today()

        res = self.client.get("/api/announcement/")
        result = Announcement.objects.filter(Q(date__month=today.month))
        self.assertEqual(len(res.data), 1) 
        self.assertEqual(res.data[0]['text'], result[0].text) 



    
    def test_get_all_groups_when_not_logged(self):

        res = self.client.get("/api/announcement/")
        self.assertEqual(res.status_code, 401)

    

    def test_update_announcement(self):

        self.login()

        new_announcement = {
                "text": "edited",
                "is_for_all": True,
        }
        
        all = Announcement.objects.all()
        res = self.client.put(f"/api/announcement/{all[0].id}",data=new_announcement, content_type='application/json')
        self.assertEqual(res.data['text'], new_announcement['text']) 
        self.assertEqual(res.data['is_for_all'], new_announcement['is_for_all']) 
    


    def test_update_announcement_when_not_logged(self):
        
        new_announcement = {
                "text": "edited",
                "is_for_all": True,
        }

        res = self.client.put("/api/announcement/10",data=new_announcement, content_type='application/json')

        self.assertEqual(res.status_code, 401)




    def test_get_announcements_from_single_day(self):
        self.login()
        today = date.today()

        url_date = f"{today.day}/{today.month}/{today.year}"

        res1 = self.client.get(f"/api/announcement/{url_date}/")
        res2 = self.client.get("/api/announcement/1/1/1909/")

        self.assertEqual(len(res1.data), 1)
        self.assertEqual(res1.data[0]['text'], "Another announcement")
        self.assertEqual(len(res2.data), 0)
       
