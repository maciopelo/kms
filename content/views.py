from datetime import date
from django.shortcuts import render
from rest_framework import serializers, status
from rest_framework import response
from rest_framework.views import APIView
from backend.utils import *
from .serializers import NewsSerializer, NewsFileSerializer, FileSerializer
from .models import News, NewsFile, File
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Q



class FileView(APIView):

    def get(self, request):

        parser_classes = [MultiPartParser, FormParser]

        authenticate_user(request)

        files = File.objects.all()
        serializer = FileSerializer(files, many=True)

        return Response(serializer.data, content_type='application/pdf')

    
    def delete(self, request, pk=None):
        
        authenticate_user(request)

        try:
            file = File.objects.get(id=pk)
            serializer = FileSerializer(file)
            file.delete()
        except (File.DoesNotExist, ValidationError):
            return Response({'msg':"File of given id does not exist"}, status=status.HTTP_404_NOT_FOUND) 

        
        return Response({**serializer.data, "id":pk})



    def post(self, request, format=None):

        parser_classes = [MultiPartParser, FormParser]

        authenticate_user(request)
        response = []
        for i in range(len(request.FILES)):
       
            new_file = {
                "permission":request.data['permission'],
                "file": request.FILES.getlist(f'file_{i}')[0]
            }

            news_file_serializer = FileSerializer(data=new_file)

            if news_file_serializer.is_valid():
                news_file_serializer.save()
                response.append(news_file_serializer.data)
            else:
                return Response(news_file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(response, status=status.HTTP_201_CREATED)

        


class NewsView(APIView):


    def get(self,request, pk=None):
        authenticate_user(request)

        news = News.objects.all()

        news_serializer = NewsSerializer(news, many=True)

        res_data = {
            "news":news_serializer.data,
        }

        if pk is not None:

            news = News.objects.get(id=pk)
            news_files = NewsFile.objects.filter(Q(news=news))

            news_serializer = NewsSerializer(news)
            news_files_serializer = NewsFileSerializer(news_files, many=True)

            res_data = {
                "news":news_serializer.data,
                "news_files":news_files_serializer.data
            }

        return Response(res_data)



    def post(self, request, format=None):
        authenticate_user(request)

        parser_classes = [MultiPartParser, FormParser]

        news_data = {
            "header":request.data["header"],
            "description":request.data["description"],
            "main_image":request.data["main_image"],
            "date":request.data["date"],
        }

  
        news_serializer = NewsSerializer(data=news_data)

        if news_serializer.is_valid():
            news = news_serializer.save()
           

            for i in range(len(request.FILES)-1):

                news_file_data = {
                    "news":news.id,
                    "file": request.FILES.getlist(f'img_{i}')[0]
                }

                news_file_serializer = NewsFileSerializer(data=news_file_data)

                if news_file_serializer.is_valid():
                    news_file_serializer.save()
                else:
                    return Response(news_file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(news_serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(news_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self, request, pk=None):
        
        authenticate_user(request)

        try:
            news = News.objects.get(id=pk)
            serializer = NewsSerializer(news)
            news.delete()
        except (News.DoesNotExist, ValidationError):
            return Response({'msg':"Todo of given id does not exist"}, 400) 

        
        return Response(serializer.data)

        


       

       

        