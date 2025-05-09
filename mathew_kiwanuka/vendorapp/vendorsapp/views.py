from django.shortcuts import render, redirect
from .models import *
from .forms import *
from django.contrib import messages

# Create your views here.


def dashboard(request):
    products = Product.objects.order_by('-created_at')
    form = ProductForm()

    
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Form has been successfully submitted.")
            return redirect('dashboard')
        else:
            messages.error(request, "Please correct the errors below.")