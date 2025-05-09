from django.shortcuts import render
from .models import *
from .forms import *
# Create your views here.

def homePage(request):
    stock = product.objects.get()


    return render(request, 'index.html', {'stocks': stock})

