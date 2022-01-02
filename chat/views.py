from django.http import response
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .pusher import pusher_client



class MessageView(APIView):

    def post(self,request):

        # channel = request.data['channel']
        # event = request.data['channel']

        pusher_client.trigger(
            "chat", 
            "message", 
            {   
                'sender':request.data['sender'],
                'receiver':request.data['receiver'],
                'message': request.data['message']
            }
            )
        
        return Response()

