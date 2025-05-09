from django.shortcuts import render, redirect
from .models import Product
from .forms import ProductForm

def dashboard(request):
    products = Product.objects.all()
    form = ProductForm()

    # Example logic for stats
    total_sales = 50000000
    total_orders = 15000000
    in_stock_value = sum(p.price * p.quantity for p in products)
    out_of_stock = products.filter(quantity=0).count()

    context = {
        'form': form,
        'products': products,
        'total_sales': total_sales,
        'total_orders': total_orders,
        'in_stock_value': in_stock_value,
        'out_of_stock': out_of_stock,
    }
    return render(request, 'dashboard.html', context)