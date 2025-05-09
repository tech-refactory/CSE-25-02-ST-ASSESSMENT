from django.shortcuts import render, redirect
from .forms import *
# Create your views here.
from django.contrib import messages


def index(request):
    #getting all the registered stock from our database
    stocks = Product.objects.all().order_by('-id')
    return render(request, 'index.html', {'stocks':stocks})

