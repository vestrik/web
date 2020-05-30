from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from django.db import IntegrityError
from .forms import RegForm


def registration_view(request):
    if request.method == 'POST':
        form = RegForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['logf']
            password = form.cleaned_data['passf']
            email = form.cleaned_data['emailf']
            name = form.cleaned_data['namef']
            surname = form.cleaned_data['snamef']
            try:
                user = User.objects.create_user(username, email, password, first_name=name, last_name=surname)
                user = authenticate(request, username=username, password=password)
                login(request,user)
            except IntegrityError as e:
                return HttpResponse('user with same login already exists')
            return redirect('posts:list')
    else:
        form = RegForm()
    return render(request, 'accounts/registration.html', { 'form': form })


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            #login
            user = form.get_user()
            login(request,user)
            return redirect('posts:list')
    else:
        form = AuthenticationForm()
    return render(request, 'accounts/login.html', {'form':form})


def logout_view(request):
        if request.method == 'POST':
            logout(request)
            return redirect('posts:list')
        else:
            return HttpResponse('logout error')
