from django.shortcuts import render, redirect
from .forms import ProductForm
from .models import Product

def vendor_dashboard(request):
    success = False
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            # Save the product
            form.save()
            success = True  # Set success flag
            form = ProductForm()  # Clear the form
    else:
        form = ProductForm()

    # Fetch all products to display in the table
    products = Product.objects.all()

    return render(request, 'vendor_dashboard.html', {
        'form': form,
        'success': success,
        'products': products
    })
