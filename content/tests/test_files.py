from django.test import TestCase
from ..models import File as FileModel
from users.models import User
from django.db.models import Q
from datetime import date
from django.core.files import File
from datetime import date
import mock
from users.enums import UserType


class FileTest(TestCase):

    def setUp(self):
        self.teacher1 = User.objects.create_user(
            email="teacher1@mail.com", 
            username="teacher1", 
            name="teacher1", 
            surname="teacher1",
             password="teacher1")

        self.file_mock1 = mock.MagicMock(spec=File)
        self.file_mock2 = mock.MagicMock(spec=File)
        self.file_mock1.name = 'rest1.doc'
        self.file_mock2.name = 'rest2.pdf'
        file1 = FileModel.objects.create(file=self.file_mock1, permission=UserType.HEADMASTER.value[0])
        file2 = FileModel.objects.create(file=self.file_mock2, permission=UserType.HEADMASTER.value[0])

    
    def test_get_files(self):
        self.login()

        res = self.client.get("/api/file/")
       
        result = FileModel.objects.all()
        self.assertEqual(len(res.data), len(result))
        self.assertEqual(res.data[0]['permission'], UserType.HEADMASTER.value[0])
        self.assertEqual(res.data[0]['file'].split('/')[-1], self.file_mock1.name)
    

    def test_delete_file(self):
        self.login()

        files = FileModel.objects.all()
        file = files.first()

        res = self.client.delete(f"/api/file/{file.id}")
        self.assertEqual(len(files), 1)
        self.assertEqual(res.data['file'].split('/')[-1], file.file.name.split('/')[-1])




    def tearDown(self):
        all_files = FileModel.objects.all()

        for file in all_files:
            file.file.storage.delete(file.file.name)
    

    def login(self):

        payload = {
            "username":"teacher1",
            "password":"teacher1",
        }

        res = self.client.post("/api/login/", payload)

        return True

    

   

    
    def test_get_files_when_not_logged(self):
    
        res = self.client.get("/api/file/")
        self.assertEqual(res.status_code, 401)


   


    
    def test_delete_file_when_not_logged(self):
        
        files = FileModel.objects.all()
        file = files.first()
        res = self.client.delete(f"/api/file/{file.id}")
        self.assertEqual(res.status_code, 401)

    

    def test_delete_file_which_not_exist(self):
        
        self.login()
        res = self.client.delete(f"/api/file/19999")
        self.assertEqual(res.status_code, 404)
    



    