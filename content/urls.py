from django.urls import path, include, re_path
from .views import NewsView,FileView

urlpatterns = [
    path('news/', NewsView.as_view()),
    path('news/<int:pk>', NewsView.as_view()),
    path('file/', FileView.as_view()),
    path('file/<int:pk>', FileView.as_view()),
]