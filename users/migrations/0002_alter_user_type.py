# Generated by Django 3.2.8 on 2021-11-15 21:52

from django.db import migrations, models
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='type',
            field=models.CharField(choices=[(1, 'HEADMASTER'), (2, 'TEACHER'), (3, 'PARENT')], default=users.models.UserType['PARENT'], max_length=10),
        ),
    ]
