from django.test import TestCase
from ..models import News, NewsFile
from users.models import User
from django.db.models import Q
from datetime import date
from django.core.files import File
from datetime import date
import mock


class NewsTest(TestCase):

    def setUp(self):
        self.teacher1 = User.objects.create_user(email="teacher1@mail.com", username="teacher1", name="teacher1", surname="teacher1", password="teacher1")

        self.main_img_mock = mock.MagicMock(spec=File)
        self.news_file_mock1 = mock.MagicMock(spec=File)
        self.news_file_mock2 = mock.MagicMock(spec=File)
        self.main_img_mock.name = 'mainImg.png'
        self.news_file_mock1.name = 'rest1.png'
        self.news_file_mock2.name = 'rest2.png'
        news = News.objects.create(header="News Header", description="Lorem ipsum", main_image=self.main_img_mock, date=date.today())
        NewsFile.objects.create(news=news,file=self.news_file_mock1)
        NewsFile.objects.create(news=news,file=self.news_file_mock2)


    def tearDown(self):
        all_news= News.objects.all()
        all_news_files= NewsFile.objects.all()

        for news in all_news:
            news.main_image.storage.delete(news.main_image.name)
        
        for news_file in all_news_files:
            news_file.file.storage.delete(news_file.file.name)
    

    def login(self):

        payload = {
            "email":"teacher1@mail.com",
            "password":"teacher1",
        }

        res = self.client.post("/api/login/", payload)

        return True

    

    def test_get_news(self):

        self.login()

        res = self.client.get("/api/news/")
        data = res.data['news']
        result = News.objects.all()
        self.assertEqual(len(data), len(result))
        self.assertEqual(data[0]['header'], result[0].header)
        self.assertEqual(data[0]['main_image'].split('/')[-1], self.main_img_mock.name)
    



    