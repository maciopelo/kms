from django.shortcuts import render
from backend.utils import *
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed,ValidationError
from .models import Announcement, Group
from .serializers import AnnouncementSerializer,GroupSerializer
from users.models import User
from django.db.models import Q
import datetime
import jwt


class GroupView(APIView):


    def get(self, request):
        authenticate_user(request)

        groups = Group.objects.all()
        serializer = GroupSerializer(groups, many=True)

        return Response(serializer.data)


class AnnouncementView(APIView):


    def get(self, request, day=None, month=None, year=None):

        authenticate_user(request)
        today = datetime.date.today()

        # by default from today
        announcements = Announcement.objects.filter(
            Q(date__day=today.day) & Q(date__month=today.month) &Q(date__year=today.year)
        )


        if day and month and year:
            announcements = Announcement.objects.filter(
                Q(date__day=day) & Q(date__month=month) &Q(date__year=year)
            )


        serializer = AnnouncementSerializer(announcements, many=True)
        
        return Response(serializer.data)

    
    def post(self, request):
        
        authenticate_user(request)

        serializer = AnnouncementSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    def put(self, request, pk):

        authenticate_user(request)

        try:
            ann = Announcement.objects.get(id=pk)
            serializer = AnnouncementSerializer(ann, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Announcement.DoesNotExist:
           raise status.HTTP_404_NOT_FOUND

        
