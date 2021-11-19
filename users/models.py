from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from .enums import UserType



class UserManager(BaseUserManager):

    def create_user(self, email, username, name, surname, password=None):

        if not email:
            raise ValueError("Users must have an email")
        if not username:
            raise ValueError("Users must have an username")
        if not surname:
            raise ValueError("Users must have an surname")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            name=name,
            surname=surname,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    
    def create_superuser(self, email, username, name, surname, password):

        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            name=name,
            surname=surname,
            password=password,
        )

        user.is_staff=True
        user.is_superuser=True
        user.save(using=self._db)
        
        return user



class User(AbstractBaseUser):
    
    # these fields are required while creating custom user
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(verbose_name='email', max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now_add=True)
    
    # additional fields
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=50)
    type = models.CharField(max_length=255, choices=UserType.choices(), default=UserType.HEADMASTER.value[0])
    #TODO child = models.ForeignKey(Child, on_delete=models.CASCADE, null=True)

    

    # it should be acctualy LOGIN_FIELD, its a field which will be used while logging in
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'name', 'surname']

    # reference to manager
    objects = UserManager()


    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return True
