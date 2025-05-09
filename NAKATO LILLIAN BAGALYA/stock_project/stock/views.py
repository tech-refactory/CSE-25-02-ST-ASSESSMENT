from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Product
from .forms import ProductForm

def mystock(request):
    products = Product.objects.all().order_by('-id')

    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Product added successfully!")
            return redirect("mystock")
    else:
        form = ProductForm()

    return render(request, "mystock.html", {"products": products, "form": form})
    
        

