from django.shortcuts import render, redirect
from .models import Product
from .forms import ProductForm
from django.db.models import Sum

def add_product(request):
    in_stock_count = Product.objects.filter(quantity__gt=0).count()
    out_of_stock_count = Product.objects.filter(quantity=0).count()
    sales = Product.objects.aggregate(Sum('price'))['price__sum'] or 0
    orders = Product.objects.count()

    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('add_product')  
    else:
        form = ProductForm()

    products = Product.objects.all()

    return render(request, 'add_product.html', {
        'form': form,
        'products': products,
        'in_stock_count': in_stock_count,
        'out_of_stock_count': out_of_stock_count,
        'sales': sales,
        'orders': orders,
    })
