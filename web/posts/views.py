from django.shortcuts import render, redirect, get_object_or_404
from .models import Post, Comment
from django.views.generic import RedirectView
from django.http import HttpResponse
from django.core import serializers
from django.http.response import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from . import forms
import json

# Create your views here.
def post_list(request):
    posts = Post.objects.all().order_by('-date')
    comments=Comment.objects.all()
    return render(request,'posts/post_list.html',{'posts':posts})

def post_detail(request, slug):
    post = Post.objects.get(slug=slug)
    comments = Comment.objects.filter(post=post).order_by('-date')
    if request.method == 'POST':
        if request.user.is_authenticated:
            form = forms.CommentForm(request.POST or None)
            if form.is_valid():
                instance = form.save(commit=False)
                instance.author = request.user
                instance.post = post
                instance.save()
        else: return redirect("/accounts/login/")
    else:
        form = forms.CommentForm()
    return render(request,'posts/post_detail.html',{'post':post, 'comments':comments,'form':form})


@login_required(login_url="/accounts/login/")
def post_create(request):
    if request.method == 'POST':
        form = forms.CreatePost(request.POST, request.FILES)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.author = request.user
            instance.save()
            return redirect('posts:list')
    else:
        form = forms.CreatePost()
    return render(request,'posts/post_create.html', {'form':form})


def addcomment(request,slug):
    post = Post.objects.get(slug=slug)
    data = json.loads(request.body)
    c=Comment(body=data["comment"])
    c.author = request.user
    c.post = post
    c.save()
    ID=c.id
    if request.is_ajax():
        qset=Comment.objects.filter(post=post, id=ID)
        queryset = serializers.serialize('json', qset)
        return JsonResponse(queryset, safe=False, content_type="application/json")


def updatecomment(request,slug):
    post = Post.objects.get(slug=slug)
    #result = request.post.comment_set.has_new()
    commentCountNew = Comment.objects.filter(post=post).count()
        qset=Comment.objects.filter(post=post)
        queryset = serializers.serialize('json', qset)
        return JsonResponse(queryset, safe=False, content_type="application/json")
    else: return HttpResponse('')
