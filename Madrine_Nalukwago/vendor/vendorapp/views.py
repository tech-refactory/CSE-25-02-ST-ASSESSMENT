# views.py
from django.shortcuts import render, redirect
from .models import Product
from .forms import ProductForm  # <-- Import this
from django.db.models import Sum

def add_product(request):
    # Calculate the number of in-stock and out-of-stock products
    in_stock_count = Product.objects.filter(quantity__gt=0).count()
    out_of_stock_count = Product.objects.filter(quantity=0).count()

    # Calculate total sales (assuming you have an `Order` model with `total_price`)
    sales = Product.objects.aggregate(Sum('price'))['price__sum'] or 0

    # Calculate the total number of orders
    orders = Product.objects.count()

    # Handle the form submission and product list
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('product_list')  # Adjust as needed
            # return redirect('add_product')  # Adjust to your desired page
        else:
            form = ProductForm()  # This line seems unnecessary; you have a valid form already in the POST request.
            return render(request, 'add_product.html', {'form': form})

    # Retrieve all products for the table
    products = Product.objects.all()

    return render(request, 'add_product.html', {
        'products': products,
        'in_stock_count': in_stock_count,
        'out_of_stock_count': out_of_stock_count,
        'sales': sales,
        'orders': orders
    })
