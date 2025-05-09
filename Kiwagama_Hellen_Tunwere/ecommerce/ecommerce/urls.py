from django.contrib import admin
from django.urls import path
from django.views.generic import RedirectView  
from ebook import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dashboard/', views.vendor_dashboard, name='vendor-dashboard'),
    path('', RedirectView.as_view(url='/dashboard/', permanent=False)),  
]
