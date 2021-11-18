from django.urls import path, include
from .views import LogoutView, RegisterView, LoginView, AuthView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('auth/', AuthView.as_view()),
    path('logout/', LogoutView.as_view()),
]