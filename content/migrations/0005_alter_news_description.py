# Generated by Django 3.2.8 on 2021-12-07 10:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0004_alter_news_header'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='description',
            field=models.TextField(max_length=1500),
        ),
    ]
