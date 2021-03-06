# Generated by Django 3.2.8 on 2021-11-30 21:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('header', models.CharField(max_length=30)),
                ('description', models.TextField(max_length=500)),
                ('main_image', models.FileField(default='', null=True, upload_to='images/')),
                ('date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='NewsFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(null=True, upload_to='images/')),
                ('feed', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='files', to='content.news')),
            ],
        ),
    ]
