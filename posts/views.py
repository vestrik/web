from django.shortcuts import render, redirect, get_object_or_404
from .models import Post, Comment
from django.views.generic import RedirectView
from django.http import HttpResponse
from django.core import serializers
from django.http.response import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.exceptions import MultipleObjectsReturned
from django.utils.crypto import get_random_string
from . import forms
import json

# Create your views here.
def post_list(request):
    posts = Post.objects.all().order_by('-date')
    comments=Comment.objects.all()
    return render(request,'posts/post_list.html',{'posts':posts})

@login_required(login_url="/accounts/login/")
def post_detail(request, slug):
	try:
		post = Post.objects.get(slug=slug)
		comments = Comment.objects.filter(post=post).order_by('-date')
		return render(request,'posts/post_detail.html',{'post':post, 'comments':comments})
	except MultipleObjectsReturned as e:
                return HttpResponse('Post error. Two posts with same slug')


@login_required(login_url="/accounts/login/")
def post_create(request):
        if request.method == 'POST':
            form = forms.CreatePost(request.POST, request.FILES)
            if form.is_valid():
                instance = form.save(commit=False)
                instance.author = request.user
                slug = form.cleaned_data['title']
                instance.slug = slug.translate ({ord(c): "-" for c in "  !@#$%^&*()[]{};:,./<>?\|`~-=_+"})+'-'+get_random_string(length=5)
                instance.save()
                return redirect('posts:list')
        else:
            form = forms.CreatePost()
        return render(request,'posts/post_create.html', {'form':form})


def addcomment(request,slug):
	if request.user.is_authenticated:
		post = Post.objects.get(slug=slug)
		data = json.loads(request.body.decode('utf-8'))
		c=Comment(body=data["comment"])
		c.author = request.user
		c.post = post
		c.save()
		ID=c.id
		if request.is_ajax():
			qset=Comment.objects.filter(post=post, id=ID)
			queryset = serializers.serialize('json', qset)
			return JsonResponse(queryset, safe=False, content_type="application/json")
	else: return redirect("/accounts/login/")


def updatecomment(request,slug):
    post = Post.objects.get(slug=slug)
    qset=Comment.objects.filter(post=post).order_by('date')
    queryset = serializers.serialize('json', qset)
    return JsonResponse(queryset, safe=False, content_type="application/json")
