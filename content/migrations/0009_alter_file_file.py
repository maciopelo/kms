# Generated by Django 3.2.8 on 2021-12-20 01:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0008_alter_file_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='file',
            field=models.FileField(null=True, upload_to='files'),
        ),
    ]