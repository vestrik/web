# Generated by Django 3.0.6 on 2020-05-24 10:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0013_comment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='post',
        ),
    ]
