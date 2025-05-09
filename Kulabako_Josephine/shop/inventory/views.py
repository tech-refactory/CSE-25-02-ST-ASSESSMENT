from django.shortcuts import render,redirect
from .models import Product
from .forms import ProductForm
from django.db.models import Sum
from.models import *

def product_dashboard(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('product_dashboard')
    else:
        form = ProductForm()

    products = Product.objects.all()
    total_sales = products.aggregate(total=Sum('price'))['total'] or 0
    total_orders = products.aggregate(total=Sum('price'))['total'] or 0  # Adjust logic as needed
    total_stock = products.aggregate(stock_value=Sum(models.F('price') * models.F('quantity')))['stock_value'] or 0
    out_of_stock = products.filter(quantity=0).count()

    context = {
        'form': form,
        'products': products,
        'total_sales': total_sales,
        'total_orders': total_orders,
        'total_stock': total_stock,
        'out_of_stock': out_of_stock,
    }
    return render(request, 'index', context)

