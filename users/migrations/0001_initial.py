# Generated by Django 3.2.8 on 2021-11-15 14:43

from django.db import migrations, models
import users.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('username', models.CharField(max_length=30, unique=True)),
                ('email', models.EmailField(max_length=50, unique=True, verbose_name='email')),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('last_login', models.DateTimeField(auto_now_add=True, verbose_name='last login')),
                ('name', models.CharField(max_length=30)),
                ('surname', models.CharField(max_length=50)),
                ('type', models.CharField(choices=[(1, 'HEADMASTER'), (2, 'TEACHER'), (3, 'PARENT')], default=users.models.UserType['PARENT'], max_length=1)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
