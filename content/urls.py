from django.urls import path, include, re_path
from .views import NewsView

urlpatterns = [
    path('news/', NewsView.as_view()),
    path('news/<int:pk>', NewsView.as_view()),
]