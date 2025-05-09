from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.db.models import Sum
from .models import Product
from .forms import ProductForm


# Create your views here.

def homepage(request):
    total_sales = Product.objects.aggregate(Sum('price'))['price__sum'] or 0
    total_orders = 150000000  # Replace with actual logic if needed
    total_instock = Product.objects.filter(Quantity__gt=0).aggregate(Sum('price'))['price__sum'] or 0
    total_outofstock = Product.objects.filter(Quantity=0).count()

    context = {
        'total_sales': total_sales,
        'total_orders': total_orders,
        'total_instock': total_instock,
        'total_outofstock': total_outofstock,
    }
    return render(request, "vendors.html", context)

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

def add_product(request):
    if request.method == "POST":
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("homepage")
    return redirect("homepage")