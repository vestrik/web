from django.contrib import admin
from .models import Post, Comment

class PostAdmin(admin.ModelAdmin):
    list_display = ('author', 'title', 'date')
admin.site.register(Post,PostAdmin)

class CommentAdmin(admin.ModelAdmin):
    list_display = ('post','author', 'date')
admin.site.register(Comment,CommentAdmin)
