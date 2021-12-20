from django.db.models import fields
from rest_framework import serializers
from .models import News, NewsFile, File



class NewsSerializer(serializers.ModelSerializer):

    class Meta:
        model = News
        fields = '__all__'


class NewsFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = NewsFile
        fields = '__all__'


class FileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = File
        fields = '__all__'


