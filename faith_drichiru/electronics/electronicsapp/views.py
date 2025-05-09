from django.shortcuts import render, redirect
from django.contrib import messages
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
    
    # Placeholder for dashboard totals (to be calculated later)
    total_sales = 0  # Placeholder
    total_orders = 0  # Placeholder
    in_stock_value = 0  # Placeholder
    out_of_stock_count = Product.objects.filter(quantity=0).count()

    products = Product.objects.all().order_by('-id')  # Newest first
    
    context = {
        'form': form,
        'total_sales': total_sales,
        'total_orders': total_orders,
        'in_stock_value': in_stock_value,
        'out_of_stock_count': out_of_stock_count,
        'products': products,
    }

    return render(request, 'index.html', context)
