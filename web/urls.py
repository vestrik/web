from django.contrib import admin
from django.urls import include, path, re_path
from django.conf.urls import url
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from django.conf.urls.static import static
from posts import views as posts_views
from django.views.generic.base import RedirectView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^posts/',include('posts.urls')),
    url(r'^accounts/',include('accounts.urls')),
    #url(r'^$', posts_views.post_list, name="home"),
    url(r'^$', RedirectView.as_view(url='posts/'))
    
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
