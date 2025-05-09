from django.shortcuts import render, redirect
from .models import *
from .forms import AddProductForm
from django.contrib import messages
# Create your views here.
def index(request):
    if request.method == 'POST':
        products = Product.objects.all().order_by('-id')
        form = AddProductForm(request.POST, request.FILES) 
        if form.is_valid():
            form.save()
            messages.success(request, 'Product has been added successfully')
            return redirect('/')
        else:
            messages.error(request, 'lnvalid field')
    else:
        form = AddProductForm()
        return render(request, 'index.html', {'form':form})
   # Include request.FILES for file upload
        
        
