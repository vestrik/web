from django.conf.urls import url
from django.urls import path, re_path
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from django.conf.urls.static import static

app_name='accounts'

urlpatterns = [

path('registration/',views.registration_view, name="registration"),
path('login/',views.login_view, name="login"),
path('logout/',views.logout_view, name="logout"),


]
urlpatterns += staticfiles_urlpatterns()
