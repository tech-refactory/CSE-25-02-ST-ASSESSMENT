from django.shortcuts import render, redirect
from .forms import *
from .models import *
from django.contrib import messages

# Create your views here.
def Xphones(request):
    if request.method == 'POST':
        form = AddproductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Product added successfully!")
            return redirect('')
    else:
        form = AddproductForm()
    return render(request, 'index.html')