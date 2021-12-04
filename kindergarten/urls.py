from django.urls import path, include, re_path
from .views import AnnouncementView, GroupView, ChildrenView

urlpatterns = [
    path('group/', GroupView.as_view()),
    path('announcement/', AnnouncementView.as_view()),
    path('announcement/<int:pk>', AnnouncementView.as_view()),
    path('announcement/<int:day>/<int:month>/<int:year>/', AnnouncementView.as_view()),
    path('children/', ChildrenView.as_view()),
    path('children/<int:pk>', ChildrenView.as_view()),

]