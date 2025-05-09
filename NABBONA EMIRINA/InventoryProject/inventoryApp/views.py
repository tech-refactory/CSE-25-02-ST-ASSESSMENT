from django.shortcuts import render, redirect
from .models import Product
from .forms import ProductForm
from django.db.models import Sum

def inventory_dashboard(request):
    products = Product.objects.all()
    form = ProductForm(request.POST or None, request.FILES or None)
    success = False

    if request.method == 'POST' and form.is_valid():
        form.save()
        success = True
        message = "Product added successfully!"
        # Optionally, you can clear the form after saving
        return redirect('add_product')

    total_sales = 50000000  # Placeholder; replace with logic if needed
    total_orders = 15000000  # Placeholder
    total_in_stock = 4200000
    out_of_stock = 5

    context = {
        'form': form,
        'products': products,
        'total_sales': total_sales,
        'total_orders': total_orders,
        'total_in_stock': total_in_stock,
        'out_of_stock': out_of_stock,
    }
    return render(request, 'invApp/dashboard.html', context)

