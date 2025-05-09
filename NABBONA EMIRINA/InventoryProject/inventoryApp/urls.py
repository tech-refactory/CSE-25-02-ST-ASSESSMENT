from django.urls import path
from . import views

urlpatterns = [
    path('', views.inventory_dashboard, name='add_product'),]