from django.urls import path, include
from .views import MessageView

urlpatterns = [
    path('chat/<int:sender_id>/<int:receiver_id>/', MessageView.as_view()),
    path('chat/', MessageView.as_view()),
]