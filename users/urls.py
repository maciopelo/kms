from django.urls import path, include
from .views import LogoutView, RegisterView, LoginView, AuthView, TodoView,ParentChildrenView, TeacherView, UsersView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('auth/', AuthView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('todo/', TodoView.as_view()),
    path('todo/<int:pk>', TodoView.as_view()),
    path('todo/<int:day>/<int:month>/<int:year>/', TodoView.as_view()),
    path('parent/children/', ParentChildrenView.as_view()),
    path('teacher/', TeacherView.as_view()),
    path('users/', UsersView.as_view())
]