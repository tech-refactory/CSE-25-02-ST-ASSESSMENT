from django.shortcuts import render, redirect
from django.contrib import messages

from .forms import ProductForm
from .models import Product

def indexpage(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()  
            messages.success(request, "Product added successfully!")
            return redirect('indexpage')
    else:
        form = ProductForm()

    products = Product.objects.all()

    in_stock_value = sum(product.price * product.quantity for product in products)
    out_of_stock_count = Product.objects.filter(quantity=0).count()
    total_sales = sum(product.price for product in products)
    total_orders = sum(product.price  for product in products)
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