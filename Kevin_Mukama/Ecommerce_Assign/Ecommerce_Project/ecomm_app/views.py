from django.shortcuts import render, redirect
from .forms import *

# Create your views here.
def addproductView(request):
    if request.method == 'POST':
        form = AddProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('allstockPath')
    
    else:
        form = AddProductForm()
        return render(request, "mainpage.html", {"form":form})