from django.http import response
from django.shortcuts import render
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from .pusher import pusher_client
from .models import Message, Chat
from users.models import User
from django.db.models import Q
from .serializers import ChatSerializer, MessageSerializer



class MessageView(APIView):


    def get(self, request, sender_id=None, receiver_id=None):
    

        try:
            chat = Chat.objects.get( 
                (Q(user_one=sender_id) | Q(user_one=receiver_id)) & 
                (Q(user_two=receiver_id) | Q(user_two=sender_id))
            )
        except Chat.DoesNotExist:
            user_one = User.objects.get(id=sender_id)
            user_two = User.objects.get(id=receiver_id)
            chat = Chat(user_one=user_one, user_two=user_two)
            chat.save()

        

        messages = Message.objects.filter(Q(chat_id=chat))
       
        if len(messages):
            serializer = MessageSerializer(messages, many=True) 
            return Response(serializer.data) 
        
        return Response([]) 




    def post(self, request):

        sender_id = request.data['sender']
        receiver_id = request.data['receiver']
        text = request.data['message']

       
        try:
            chat = Chat.objects.get( 
                (Q(user_one=sender_id) | Q(user_one=receiver_id)) & 
                (Q(user_two=receiver_id) | Q(user_two=sender_id))
            )

            message = Message.objects.create(text=text, sender_id=sender_id, receiver_id=receiver_id, chat=chat)

            message_data = {
                "id" : message.id,
                "text" : message.text,
                "sender_id" : message.sender_id,
                "receiver_id" : message.receiver_id,
                "date" : message.date,
                "chat" : message.chat.id,
            }

            serializer = MessageSerializer(data=message_data)

            pusher_client.trigger(
                "chat", 
                "message", 
                {   
                    'sender':message.sender_id,
                    'receiver':message.receiver_id,
                    'date':str(message.date),
                    'text': message.text
                }
            )


        except Chat.DoesNotExist:
            return Response(status=400)

        
        return Response()




