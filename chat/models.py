from datetime import timezone
from django.db import models
from users.models import User



class Chat(models.Model):

    user_one = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_one_id')
    user_two = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_two_id')

    objects = models.Manager()

    def __str__(self):
        return f'chat {self.id}'


class Message(models.Model):
    
    text = models.TextField()
    sender_id = models.BigIntegerField(verbose_name='sender_id', null=True)
    receiver_id = models.BigIntegerField(verbose_name='receiver_id', null=True)
    date = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey(Chat, null=False, on_delete=models.CASCADE)

    objects = models.Manager()

    def __str__(self):
        return f'message {self.id}'
