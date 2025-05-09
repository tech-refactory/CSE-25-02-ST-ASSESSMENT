from django.shortcuts import render, redirect
from django.contrib import messages
from decimal import Decimal
from .forms import *
from .models import Product

def Xphones(request):
    if request.method == 'POST':
        form = AddproductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Product added successfully!")
            return redirect('index')
    else:
        form = AddproductForm()
    
    products = Product.objects.all()
    
    # Calculate total stock value (price * quantity for each product)
    in_stock_value = sum(product.price * product.quantity for product in products)
    
    # Count products out of stock
    out_of_stock_count = Product.objects.filter(quantity=0).count()
    
    # For sales and orders, we'll use placeholder logic since we don't have sales tracking yet
    total_sales = sum(product.price * Decimal('0.8') for product in products)  # Assuming 80% of stock has been sold
    total_orders = sum(product.price * Decimal('0.2') for product in products)  # Assuming 20% are in orders
    
    # Get all products for the table, newest first
    products = products.order_by('-id')
    
    context = {
        'form': form,
        'total_sales': total_sales,
        'total_orders': total_orders,
        'in_stock_value': in_stock_value,
        'out_of_stock_count': out_of_stock_count,
        'products': products,
    }

    return render(request, 'index.html', context)