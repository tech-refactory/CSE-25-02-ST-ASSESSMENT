from django.urls import path
from . import views

urlpatterns = [
    # Other URL patterns
    path('', views.vendor_dashboard, name='vendor_dashboard'),
]
