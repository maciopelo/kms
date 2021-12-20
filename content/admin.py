from django.contrib import admin
from .models import News, NewsFile, File

admin.site.register(News)
admin.site.register(NewsFile)
admin.site.register(File)
