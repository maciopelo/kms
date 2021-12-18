from django.shortcuts import render
from backend.utils import *
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed,ValidationError
from .models import Announcement, Child, Group
from .serializers import AnnouncementSerializer, GroupSerializer, ChildSerializer
from users.models import User
from users.enums import UserType
from django.db.models import Q
import datetime
import jwt


class GroupView(APIView):

    def get(self, request):

        authenticate_user(request)

        groups = Group.objects.all()
        serializer = GroupSerializer(groups, many=True)

        response = []

        for group in serializer.data:
            
            group['children_count'] = len(Child.objects.filter(group=group['id']))
            group['teacher'] = User.objects.get(id=group['teacher']).name + " " + User.objects.get(id=group['teacher']).surname
            response.append(group)
        
        return Response(response)



    def delete(self,request, pk):

        authenticate_user(request)

        try:
            group = Group.objects.get(id=pk)
            serializer = GroupSerializer(group)
            group.delete()

            return Response({**serializer.data, "id":pk})

        except Child.DoesNotExist:

            return Response({'msg':"Group with given id does not exist."}, status=status.HTTP_404_NOT_FOUND)




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

        new_announcement = {
      
            "text":request.data['text'],
            "date":request.data['date'],
            'is_for_all':request.data['is_for_all']
        }

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



    def delete(self, request, pk):
    
        authenticate_user(request)
        
        try:
            announ = Announcement.objects.get(id=pk)
            serializer = AnnouncementSerializer({"id":announ.id, "group":announ.group, "text":announ.text, "date":announ.date, "is_for_all":announ.is_for_all})
            announ.delete()
        except (Announcement.DoesNotExist, ValidationError):
            return Response({'msg':"Announcement of given id does not exist"}, 400) 
            
            
        return Response(serializer.data)



class ChildrenView(APIView):


    def get(self, request,pk=None):


        
        authenticate_user(request)
        children = Child.objects.all()
        in_group = request.GET.get('in_group','')

        if in_group == "false":
            children = Child.objects.filter(group=None)
        
        if in_group == "true":
            children = Child.objects.filter(~Q(group=None))

        if pk is not None:
            try:
                children = Child.objects.get(id=pk)
            
            except Child.DoesNotExist:
                return Response({'msg':"Child with given id does not exist."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ChildSerializer(children, many = True if pk is None else False)

        return Response(serializer.data)



    def post(self,request):

        authenticate_user(request)


        serializer = ChildSerializer(data=request.data) 



        if serializer.is_valid() and len(request.data['pesel']) == 11:
            new_child = serializer.save()
            
       
            parent_name = request.data['parent_one'].split(',')[0].split(' ')[0]
            parent_surname = request.data['parent_one'].split(',')[0].split(' ')[1]

            new_child_parent_user = User.objects.create_user(
                username=f"parent{new_child.id}", 
                email=f"parent{request.data['pesel']}@mail.com", 
                name=parent_name, 
                surname=parent_surname,
                password=request.data['pesel'],
            )

            new_child_parent_user.type = UserType.PARENT.value[0]
            new_child_parent_user.save()

            new_child_parent_user.children.add(Child.objects.get(id=new_child.id))


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
        