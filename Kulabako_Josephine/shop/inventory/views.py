from django.shortcuts import render, redirect
from django.db.models import Sum, F
from django.contrib import messages
from .models import Product
from .forms import ProductForm

def product_dashboard(request):
    success = False

    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            success = True
            form = ProductForm()  # reseting the form after successfully  being submitted
        else:
            messages.error(request, 'Form is not valid')
    else:
        form = ProductForm()

    products = Product.objects.all()
    total_sales = products.aggregate(total=Sum('price'))['total'] or 0
    total_stock = products.aggregate(stock_value=Sum(F('price') * F('quantity')))['stock_value'] or 0
    out_of_stock = products.filter(quantity=0).count()

    context = {
        'form': form,
        'products': products,
        'total_sales': total_sales,
        'total_stock': total_stock,
        'out_of_stock': out_of_stock,
        'success': success,
    }
    return render(request, 'index.html', context)
