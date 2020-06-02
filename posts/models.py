from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse


# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField()
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    thumb = models.ImageField(blank=True, null=True, upload_to = "uploads")
    author =  models.ForeignKey(User,default=None,on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    def snippet(self):
        return self.body[:100] + '...'



class Comment(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    body = models.TextField(null=True)
    author =  models.ForeignKey(User,to_field="username",default=None,on_delete=models.CASCADE)
    post =  models.ForeignKey(Post,default=None,on_delete=models.CASCADE, related_name='p')


    def __str__(self):
        return '{}-{}'.format(self.post.title, str(self.author.username))

    def getDate(self):
        return self.date

    def serialize(self):
        return {
            "id":self.id,
            "date":self.date,
            "body":self.body,
            "author":self.author
        }
