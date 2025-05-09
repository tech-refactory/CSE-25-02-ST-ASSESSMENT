from django.shortcuts import render, redirect
from .forms import ProductForm
from .models import Product
from django.db.models import Sum

# Create your views here.


def dashboard(request):
    form = ProductForm()
    success = False

   
    return render(request, 'dashboard.html', context)
