from django.shortcuts import render
from backend.utils import *
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed,ValidationError
from .models import Announcement, Child, Group
from .serializers import AnnouncementSerializer, GroupSerializer, ChildSerializer
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
            return Response(status=status.HTTP_404_NOT_FOUND)



class ChildrenView(APIView):


    def get(self,request):

        authenticate_user(request)

        children = Child.objects.all()
        serializer = ChildSerializer(children, many=True)

        return Response(serializer.data)



    def post(self,request):

        authenticate_user(request)

        serializer = ChildSerializer(data=request.data) 



        if serializer.is_valid() and len(request.data['pesel']) == 11:
            serializer.save()
            return Response(serializer.data)


        errors = {**serializer.errors}

        if len(request.data['pesel']) != 11:
            errors['pesel'] = ['Pesel must consists of 11 characters.']
 
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self,request,pk):

        authenticate_user(request)

        try:
            child = Child.objects.get(id=pk)
            serializer = ChildSerializer(child)
            child.delete()
            
            return Response(serializer.data)

        except Child.DoesNotExist:

            return Response({'msg':"Child with given id does not exist."}, status=status.HTTP_404_NOT_FOUND)


    
    def put(self,request, pk):

        authenticate_user(request)

        try:
            child = Child.objects.get(id=pk)
            serializer = ChildSerializer(child, data=request.data)

            if serializer.is_valid() and len(request.data['pesel']) == 11:
                serializer.save()
                return Response(serializer.data)
            
            errors = {**serializer.errors}
            
            if len(request.data['pesel']) != 11:
                errors['pesel'] = ['Pesel must consists of 11 characters.']

            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

        except Child.DoesNotExist:

            return Response({'msg':"Child with given id does not exist."}, status=status.HTTP_404_NOT_FOUND)
        