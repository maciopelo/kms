# Generated by Django 3.2.8 on 2021-11-23 08:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('kindergarten', '0001_initial'),
        ('users', '0004_auto_20211120_1259'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='child',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='kindergarten.child'),
        ),
    ]
