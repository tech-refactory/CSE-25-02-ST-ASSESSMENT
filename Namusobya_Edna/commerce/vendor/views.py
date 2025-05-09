from .models import *
from .forms import *
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


@login_required
def vendor_dashboard(request):
    return render(request, 'vendor/dashboard_review.html')


def product_view(request):
    products = Product.objects.all()
    form = ProductForm(request.POST or None, request.FILES or None)

    if form.is_valid():
        form.save()
        return redirect('vendor:productview')

    sales = 50000000  # hardcoded for now
    orders = 15000000  # hardcoded
    in_stock_value = sum(p.price * p.quantity for p in products)
    out_of_stock = products.filter(quantity=0).count()

    context = {
        'products': products,
        'form': form,
        'sales': sales,
        'orders': orders,
        'in_stock_value': in_stock_value,
        'out_of_stock': out_of_stock,
    }
    return render(request, 'product.html', context)