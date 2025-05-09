from django.shortcuts import render, redirect
from django.contrib import messages
from django.db.models import Sum, F
from decimal import Decimal
from .forms import ProductForm
from .models import Product

# Create your views here.
def landing_page(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Product added successfully!")
            return redirect('landing_page')
    else:
        form = ProductForm()
    
    # Calculate statistics
    products = Product.objects.all()
    
    # Calculate total value of products in stock
    in_stock_value = products.aggregate(
        total=Sum(F('price') * F('quantity'))
    )['total'] or Decimal('0')
    
    # Count products out of stock
    out_of_stock_count = products.filter(quantity=0).count()
    
    # Assuming 20% of in_stock_value represents total sales (for demo purposes)
    total_sales = in_stock_value * Decimal('0.2')
    
    # Assuming 10% of in_stock_value represents pending orders (for demo purposes)
    total_orders = in_stock_value * Decimal('0.1')
    
    # Get all products ordered by most recent first
    products = products.order_by('-id') 
    
    context = {
        'form': form,
        'total_sales': total_sales,
        'total_orders': total_orders,
        'in_stock_value': in_stock_value,
        'out_of_stock_count': out_of_stock_count,
        'products': products,
    }

    return render(request, 'landingpage.html', context)
