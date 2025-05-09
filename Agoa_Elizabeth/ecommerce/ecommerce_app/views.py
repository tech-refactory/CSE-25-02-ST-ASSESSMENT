from django.shortcuts import render, redirect
from .models import Product
from .forms import ProductForm
from django.db.models import Sum
from django.contrib import messages

# Create your views here.


def vendors_dashboard(request):
    products = Product.objects.order_by('-id')
    form = ProductForm()

    # Handle form submission
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Product added successfully!')
            return redirect('vendors-dashboard')

    # calculations
    total_sales = 50000000  
    expected_orders = 15000000  
    capital_in_stock = Product.objects.aggregate(total=Sum('price'))['total'] or 0
    out_of_stock_count = Product.objects.filter(Quantity=0).count()

    context = {
        'form': form,
        'products': products,
        'total_sales': total_sales,
        'expected_orders': expected_orders,
        'capital_in_stock': capital_in_stock,
        'out_of_stock_count': out_of_stock_count,
    }
    return render(request, 'vendors_dashboard.html', context)
def delete_product(request, product_id):
    product_id = Product.objects.get(id=product_id)
    if request.method == 'POST':
        product_id.delete()
        messages.success(request, 'Product deleted successfully!')
        return redirect('vendors-dashboard')