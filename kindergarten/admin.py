from django.contrib import admin
from .models import Group, Child, Attendance, Announcement


admin.site.register(Group)
admin.site.register(Child)
admin.site.register(Attendance)
admin.site.register(Announcement)