from django.shortcuts import render, redirect
from .models import *
from django.contrib import messages
from django.contrib.humanize.templatetags.humanize import intcomma
from .forms import *

# Create your views here.
def index(request):
    products = Product.objects.all().order_by('-created_at')
    average_order_value = 500000 
    orders_count = 5
    total_sales = sum(product.price * (product.quantity + 5) for product in products) or 50000000 
    total_orders = orders_count * average_order_value or 15000000
    
    in_stock = sum(product.price * product.quantity for product in products) or 42000000
    out_of_stock = products.filter(quantity=0).count() or 5

    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form = form.save()
            messages.success(request, 'Product created successfully!')
            return redirect('index')
        """else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f"{field.replace('_', ' ').title()}: {error}")"""
    else:
        form = ProductForm()

    context = {
        'form': form,
        'products': products,
        'total_sales': total_sales,
        'total_orders': total_orders,
        'in_stock': in_stock,
        'out_of_stock': out_of_stock,
    }

    return render(request, 'index.html', context)

def index2(request):
    products = Product.objects.all().order_by('-created_at')
    average_order_value = 500000 
    orders_count = 30  
    total_sales = sum(product.price * (product.quantity + 5) for product in products) or 50000000 
    total_orders = orders_count * average_order_value or 15000000
    
    in_stock = sum(product.price * product.quantity for product in products) or 42000000
    out_of_stock = products.filter(quantity=0).count() or 5

    if request.method == 'POST':
        form = ProductsForm(request.POST, request.FILES)
        if form.is_valid():
            products = form.save()
            messages.success(request, 'Product created successfully!')
            return redirect('index')
    else:
        form = ProductsForm()

    context = {
        'form': form,
        'products': products,
        'total_sales': total_sales,
        'total_orders': total_orders,
        'in_stock': in_stock,
        'out_of_stock': out_of_stock,
    }

    return render(request, 'index2.html', context)