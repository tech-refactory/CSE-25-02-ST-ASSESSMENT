from django.urls import path
from . import views
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


app_name = 'vendor'

urlpatterns = [
    path('', views.product_view, name='productview'),
    path('dashboard/', views.vendor_dashboard, name='vendor_dashboard'),
] 