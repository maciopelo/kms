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

          


# class NewsFileView(APIView):


#     def get(self, request):
#         authenticate_user(request)

#         news_files = NewsFile.objects.all()
        
#         news_file_serializer = NewsFileSerializer(news_files, many=True)


#         return Response(news_file_serializer.data)
    

#     def post(self, request):
#         authenticate_user(request)
#         parser_classes = [MultiPartParser, FormParser]

#         news_id = request.data['id']
#         files = request.FILES.getlist("rest_image")

#         news = News.objects.filter(Q(id=news_id))

#         if len(news) > 0:

#             for f in files:

#                 news_file_data = {
#                     "news":news_id,
#                     "file": f
#                 }

#                 news_file_serializer = NewsFileSerializer(data=news_file_data)

#                 if news_file_serializer.is_valid():
#                     news_file_serializer.save()
#                 else:
#                     return Response(news_file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         else:
#             return Response({"msg":f"No news of id {news_id}"}, status=status.HTTP_400_BAD_REQUEST)
        


#         return Response({"msg":f"Succesfully added {len(files)} files"},status=status.HTTP_201_CREATED)

        


       

       

        