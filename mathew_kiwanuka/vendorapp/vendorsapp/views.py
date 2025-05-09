from django.shortcuts import render
from .models import *
from .forms import *
from django.contrib import messages

# Create your views here.


def dashboard(request):
    products = Product.objects.order_by('-created_at')
    form = ProductForm()