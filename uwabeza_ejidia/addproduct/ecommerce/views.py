from django.shortcuts import render, redirect
from .models import Product
from .forms import ProductForm
from django.contrib import messages
from django.core.paginator import Paginator

def vendor_dashboard(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Product added successfully!')
            return redirect('vendor_dashboard')
        else:
            messages.error(request, 'Please correct the errors in the form.')
    elif request.method == 'GET' and 'clear' in request.GET:
        messages.success(request, 'Form cleared successfully!')
        return redirect('vendor_dashboard')

    # Fetch all products and apply pagination
    products = Product.objects.all()
    paginator = Paginator(products, 5)  # Show 5 products per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    # Calculate metrics
    total_sales = sum(p.total_value for p in products)  # Total value of all products
    total_orders = sum(p.total_value for p in products.filter(quantity__gt=0))  # Value of in-stock products as orders
    capital_in_stock = sum(p.total_value for p in products.filter(quantity__gt=0))  # Value of in-stock products
    out_of_stock_count = products.filter(quantity=0).count()  # Count of out-of-stock products

    context = {
        'form': ProductForm(),
        'total_sales': f"UGX {total_sales:,.0f}",
        'total_orders': f"UGX {total_orders:,.0f}",
        'capital_in_stock': f"UGX {capital_in_stock:,.0f}",
        'out_of_stock_count': out_of_stock_count,
        'page_obj': page_obj,
    }
    return render(request, 'vendor/product_dashboard.html', context)