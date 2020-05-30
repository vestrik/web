from django.contrib import admin
from django.urls import include, path, re_path
from django.conf.urls import url
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from django.conf.urls.static import static
from posts import views as posts_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('posts/',include('posts.urls')),
    path('accounts/',include('accounts.urls')),
    url(r'^$', posts_views.post_list, name="home"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
