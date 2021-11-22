from django.urls import path, include
from .views import LogoutView, RegisterView, LoginView, AuthView, TodoView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('auth/', AuthView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('todo/', TodoView.as_view()),
    path('todo/<int:day>/<int:month>/<int:year>/', TodoView.as_view())
]