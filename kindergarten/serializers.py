from django.db.models import fields
from rest_framework import serializers
from .models import Announcement, Group, Child



class AnnouncementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Announcement
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        fields = '__all__'


class ChildSerializer(serializers.ModelSerializer):

    class Meta:
        model = Child
        fields = '__all__'

