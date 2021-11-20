from django.shortcuts import render
from rest_framework import serializers
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import datetime
import jwt


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

        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        

        if user is None:
            raise AuthenticationFailed({'msg':'nieprawidłowy email lub hasło'})

        if not user.check_password(password):
            raise AuthenticationFailed({'msg':'nieprawidłowy email lub hasło'})


        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=48),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret_key', algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'id':user.id,
            'type':user.type,
        }

        
        return response



class AuthView(APIView):
    
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("błąd uwierzytelniania")

        try:
            payload = jwt.decode(token, 'secret_key', algorithms=['HS256'])

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("błąd uwierzytelniania")
       
        user = User.objects.get(pk=payload['id'])

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


# class UserView(APIView):
    
#     def get(self, request):
#         token = request.COOKIES.get('jwt')

#         if not token:
#             raise AuthenticationFailed("Unauthenticated!")

#         try:
#             payload = jwt.decode(token, 'secret_key', algorithms=['HS256'])
#         except jwt.ExpiredSignatureError:
#             raise AuthenticationFailed("Unauthenticated!")
       
#         user = User.objects.get(pk=payload['id'])
#         serializer = UserSerializer(user)

#         return Response(serializer.data)







