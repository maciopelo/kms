from django.db import models
from django.contrib.auth.models import AbstractUser



class User(models.Model):
    nick = models.CharField(max_length=50, null=True)
