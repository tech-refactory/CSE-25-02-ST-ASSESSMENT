from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
from .models import Product
from .forms import ProductForm
from django.db.models import Sum
from django.contrib import messages

def vendor_dashboard(request):
    products = Product.objects.all()
    form = ProductForm()

    # Handle form submission
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Product added successfully!')
            return redirect('vendor-dashboard')

    # Summary calculations
    total_sales = 50000000  # Placeholder, or calculate from a Sale model
    expected_orders = 15000000  # Placeholder
    capital_in_stock = Product.objects.aggregate(total=Sum('price'))['total'] or 0
    out_of_stock_count = Product.objects.filter(quantity=0).count()

    context = {
        'form': form,
        'products': products,
        'total_sales': total_sales,
        'expected_orders': expected_orders,
        'capital_in_stock': capital_in_stock,
        'out_of_stock_count': out_of_stock_count,
    }
    return render(request, 'ebook/dashboard.html', context)
