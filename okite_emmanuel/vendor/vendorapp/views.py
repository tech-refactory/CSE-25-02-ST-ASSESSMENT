from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Product
from .forms import ProductForm

def dashboard(request):
    # Seed sample products if none exist
    if not Product.objects.exists():
        Product.objects.create(name="Sumsand s25+ultra", category="Smart phones", price=3500000, quantity=981)
        Product.objects.create(name="Gucci XXX shirt", category="Fashion", price=2800000, quantity=100)
        Product.objects.create(name="XL zara shirt", category="Fashion", price=150000, quantity=56)
        Product.objects.create(name="iphone 15", category="Smart phones", price=420000, quantity=572)
        Product.objects.create(name="smart home curtain", category="Interior designs", price=260000, quantity=26)

    # Get products data
    products = Product.objects.all().order_by('-product_id')

    # Dashboard totals (placeholder values)
    total_sales = 50000000
    total_orders = 15000000
    total_inventory_value = 42000000

    # Stock counts
    in_stock_count = products.filter(quantity__gt=0).count()
    out_of_stock_count = products.filter(quantity=0).count()

    # Handle form submission
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('dashboard')
        else:
            messages.error(request, 'Invalid fields')
    else:
        form = ProductForm()
    context = {
        'form': form,
        'products': products,
        'total_sales': total_sales,
        'total_orders': total_orders,
        'total_inventory_value': total_inventory_value,
        'in_stock_count': in_stock_count,
        'out_of_stock_count': out_of_stock_count,
    }

    return render(request, 'dashboard.html', context)
