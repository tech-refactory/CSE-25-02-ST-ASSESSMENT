from django.shortcuts import render, redirect
from .models import *
from .forms import AddProductForm
from django.contrib import messages
# Create your views here.
def index(request):
    products = Product.objects.all()  # define it unconditionally, or set a default
    return render(request, 'index.html', {'products': products})

    

    
   # Include request.FILES for file upload
        
        
