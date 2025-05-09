from django.shortcuts import render, redirect
from django.contrib import messages
from decimal import Decimal
from .models import Product
from .forms import ProductForm

def index(request):
    # Get all products ordered by newest first, using string length and value for correct ordering of #numbers
    products = Product.objects.all().order_by('-product_id').order_by(
        '-product_id'
    )
    
    average_order_value = 500000 
    orders_count = 30  
    total_sales = sum(product.price * (product.quantity + 5) for product in products) or 50000000 
    total_orders = orders_count * average_order_value or 15000000
    in_stock = sum(product.price * product.quantity for product in products) or 42000000
    out_of_stock = Product.objects.filter(quantity=0).count() or 5
    
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            product = form.save()
            messages.success(request, 'Product has been added successfully!')
            return redirect('landing_page')
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

    return render(request, 'landingpage.html', context)