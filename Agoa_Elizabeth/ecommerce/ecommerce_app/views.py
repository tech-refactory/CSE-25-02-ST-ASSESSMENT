from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Product
from .forms import ProductForm


# Create your views here.

def homepage(request):
    return HttpResponse("Welcome to the E-commerce Homepage!")

def vendors_products(request):
    products = Product.objects.all()
    form = ProductForm()
    if request.method == "POST":
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            form = ProductForm()
            success = True 
        else:
            success = False
    else:
        success = None

    context = {
        "products": products,
        "form": form,
        "success": success,
    }
    return render(request, "vendors.html", context)