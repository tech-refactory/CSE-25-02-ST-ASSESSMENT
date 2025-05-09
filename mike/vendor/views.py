from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ProductForm
from .models import Product

def vendor_dashboard(request):
    total_revenue = 100000  
    expected_revenue = 50000
    capital_in_stock = 150000
    products_out_of_stock = Product.objects.filter(quantity=0).count()

    products = Product.objects.all()
    form = ProductForm()

    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Product added successfully!")
            return redirect('vendor_dashboard')

    return render(request, 'vendor_dashboard.html', {
        'total_revenue': total_revenue,
        'expected_revenue': expected_revenue,
        'capital_in_stock': capital_in_stock,
        'products_out_of_stock': products_out_of_stock,
        'form': form,
        'products': products,
    })
