from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ProductForm
from .models import Product

def vendor_dashboard(request):
    # Assuming these values come from your models or are computed based on current sales data
    total_revenue = 100000  # Example value, replace with actual calculation
    expected_revenue = 50000  # Example value, replace with actual calculation
    capital_in_stock = 150000  # Example value
    products_out_of_stock = Product.objects.filter(quantity=0).count()

    products = Product.objects.all()  # Fetch all products
    form = ProductForm()

    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Product added successfully!")
            return redirect('vendor_dashboard')  # Redirect to reload the page and clear the form

    return render(request, 'vendor_dashboard.html', {
        'total_revenue': total_revenue,
        'expected_revenue': expected_revenue,
        'capital_in_stock': capital_in_stock,
        'products_out_of_stock': products_out_of_stock,
        'form': form,
        'products': products,
    })
