from datetime import date
from django.shortcuts import render
from rest_framework import serializers, status
from rest_framework.views import APIView
from backend.utils import *
from .serializers import NewsSerializer, NewsFileSerializer
from .models import News, NewsFile
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Q



class NewsView(APIView):


    def get(self,request, pk=None):
        authenticate_user(request)

        news = News.objects.all()

        news_serializer = NewsSerializer(news, many=True)

        if pk is not None:

            news = News.objects.get(id=pk)

            print(news)
            news_serializer = NewsSerializer(news)



        return Response(news_serializer.data)



    def post(self, request, format=None):
        authenticate_user(request)

        parser_classes = [MultiPartParser, FormParser]

        news_serializer = NewsSerializer(data=request.data)

        if news_serializer.is_valid():
            news_serializer.save()
            return Response(news_serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(news_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
        
        


class NewsFileView(APIView):


    def get(self, request):
        authenticate_user(request)

        news_files = NewsFile.objects.all()
        
        news_file_serializer = NewsFileSerializer(news_files, many=True)


        return Response(news_file_serializer.data)
    

    def post(self, request):
        authenticate_user(request)
        parser_classes = [MultiPartParser, FormParser]

        news_id = request.data['id']
        files = request.FILES.getlist("files")

        news = News.objects.filter(Q(id=news_id))

        if len(news) > 0:

            for f in files:

                news_file_data = {
                    "news":news_id,
                    "file": f
                }

                news_file_serializer = NewsFileSerializer(data=news_file_data)

                if news_file_serializer.is_valid():
                    news_file_serializer.save()
                else:
                    return Response(news_file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({"msg":f"No news of id {news_id}"}, status=status.HTTP_400_BAD_REQUEST)
        


        return Response({"msg":f"Succesfully added {len(files)} files"},status=status.HTTP_201_CREATED)

        


       

       

        