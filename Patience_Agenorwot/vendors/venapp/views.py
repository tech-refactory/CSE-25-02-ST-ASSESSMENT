from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ProductForm
from .models import Product
# Create your views here.



def product_list(request):
    products = Product.objects.all()
    total_sales = 50000000  
    total_orders = 15000000  
    in_stock_value = sum(p.price * p.quantity for p in products)
    out_of_stock_count = products.filter(quantity=0).count()

    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Product added successfully!')
            return redirect('product_list')
    else:
        form = ProductForm()

    context = {
        'form': form,
        'products': products,
        'total_sales': total_sales,
        'total_orders': total_orders,
        'in_stock_value': in_stock_value,
        'out_of_stock_count': out_of_stock_count,
    }
    return render(request, 'venapp/product_list.html', context)
