# Generated by Django 5.0.4 on 2024-05-07 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TodoList', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='date',
        ),
        migrations.RemoveField(
            model_name='todo',
            name='time',
        ),
        migrations.AddField(
            model_name='todo',
            name='deadline',
            field=models.DateTimeField(default=None),
        ),
    ]
