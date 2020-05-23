from django.conf.urls import url
from django.urls import path, re_path
from . import views

app_name='posts'

urlpatterns = [
    path('',views.post_list, name="list"),
    path('create/', views.post_create, name='create'),
    path('<slug>/', views.post_detail, name="detail"),
]
