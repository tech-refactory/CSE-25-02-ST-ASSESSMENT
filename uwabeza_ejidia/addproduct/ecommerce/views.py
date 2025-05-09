from django.shortcuts import render, redirect
from django.contrib import messages
from .models import AddProduct
from .forms import AddProductForm


# Create your views here.
def vendor_dashboard(request):
    if request.method == 'POST':
        form = AddProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            # putting success message
            messages.success(request, "Product added successfully.")

            return redirect('product_dashboard') 
        else:messages.error(request,'Please correct the errors below.')
    else:
        form = AddProductForm()

    # High-level insights
    total_sales = 0 
    Orders = 0
    capital_in_stock = sum(p.total_value for p in AddProduct.objects.all())
    out_of_stock = AddProduct.objects.filter(quantity=0).count()

    # All products 
    products = AddProduct.objects.all().order_by('-id')

    context = {
        'form': form,
        'products': products,
        'total_revenue': total_sales,
        'expected_revenue': Orders,
        'capital_in_stock': capital_in_stock,
        'out_of_stock_count': out_of_stock,
    }
    return render(request, 'vendor/product_dashboard.html', context)
