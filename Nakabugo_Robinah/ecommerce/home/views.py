from django.shortcuts import render
from django.contrib import messages
# Create your views here.
# views.py
from django.shortcuts import render, redirect
from .models import Product
from .forms import ProductForm


def home(request):
    # Get all products ordered by newest first
    products = Product.objects.all().order_by('-id')
    form = ProductForm()
    form_submitted = False
    form_valid = True

    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        form_submitted = True
        
        if form.is_valid():
            form.save()
            messages.success(request, 'Product added successfully!')
            # Return to the same page but with a clean form
            return redirect('index')
        else:
            form_valid = False

    
    total_sales = 50000000  
    total_orders = 15000000  
    in_stock_value = 42000000  
    out_of_stock_count = 5

    context = {
        'products': products,
        'form': form,
        'form_submitted': form_submitted,
        'form_valid': form_valid,
        'total_sales': total_sales,
        'total_orders': total_orders,
        'in_stock_value': in_stock_value,
        'out_of_stock_count': out_of_stock_count,
    }
    
    return render(request, 'index.html', context)