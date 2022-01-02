from django.urls import path, include
from .views import MessageView

urlpatterns = [
    path('chat/', MessageView.as_view()),
]