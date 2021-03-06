from django.shortcuts import render
from backend.utils import *
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from .serializers import UserSerializer,TodoSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed,ValidationError
from .models import User, Todo
from kindergarten.models import Child, Group
from kindergarten.serializers import ChildSerializer
from django.db.models import Q
import datetime
import jwt
from users.enums import UserType


class RegisterView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=201)



class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        username = request.data['username']
        password = request.data['password']

        user = User.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed({'msg':'nieprawidłowy użytkownik lub hasło'})

        if not user.check_password(password):
            raise AuthenticationFailed({'msg':'nieprawidłowy użytkownik lub hasło'})


        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=48),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret_key', algorithm='HS256')

        response = Response()
        # response.set_cookie(key='jwt', value=token, httponly=True, secure=True, samesite='None')
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'id':user.id,
            'type':user.type,
        }

        
        return response



class AuthView(APIView):
    
    def post(self, request):

        user = authenticate_user(request)

        response = Response()
        response.data = {
            'id':user.id,
            'type':user.type,
        }

        return response


class LogoutView(APIView):
    
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        
        return response



class TodoView(APIView):


    def get(self, request, day=None, month=None, year=None):

        user = authenticate_user(request)
        
        curr_month = datetime.date.today().month

        # default from current month
        todos = Todo.objects.filter(Q(user=user) & Q(date__month=curr_month))


        # if given then from single day
        if day and month and year:
            today = f"{year}-{month}-{day}"
            todos = Todo.objects.filter(Q(user=user) & Q(date=today))
        

        serializer = TodoSerializer(todos, many=True)

        return Response(serializer.data)

    
    def post(self, request):

        user = authenticate_user(request)

        new_todo = {
            "text":request.data['text'],
            "date":request.data['date'],
            'user':getattr(user,'id')
        }


        serializer = TodoSerializer(data=new_todo)
        
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        
        return Response({'msg':"empty task"}, 400)

    
    def delete(self, request, pk):

        user = authenticate_user(request)
        
        try:
            todo = Todo.objects.get(Q(user=user) & Q(id=pk))
            serializer = TodoSerializer({"id":todo.id, "text":todo.text, "date":todo.date, "user":todo.user})
            todo.delete()
        except (Todo.DoesNotExist, ValidationError):
            return Response({'msg':"Todo of given id does not exist"}, 400) 
            
            
        return Response(serializer.data)



class ParentChildrenView(APIView):

    def get(self, request):

        user = authenticate_user(request)
        children = Child.objects.filter(Q(user=user))
        serializer = ChildSerializer(children,many=True)

        return Response(serializer.data)



class TeacherView(APIView):

    def get(self, request):
    
        authenticate_user(request)

        has_group = request.GET.get('has_group','')

        teachers = User.objects.filter(Q(type=UserType.TEACHER.value[0]))


        if has_group == "false":
            groups = Group.objects.all()
            group_ids = [group.teacher.id for group in groups if group.teacher is not None ]
            teachers = User.objects.filter(Q(type=UserType.TEACHER.value[0]) & ~Q(pk__in=group_ids))
        
        if has_group == "true":
            groups = Group.objects.all()
            group_ids = [group.teacher.id for group in groups]
            teachers = User.objects.filter(Q(type=UserType.TEACHER.value[0]) & Q(pk__in=group_ids))


        serializer = UserSerializer(teachers, many=True)

        return Response(serializer.data)


class UsersView(APIView):
    
    def get(self, request):
    
        authenticate_user(request)

        users = User.objects.all()
        serializer = UserSerializer(users,many=True)

        return Response(serializer.data)
            

        

  






