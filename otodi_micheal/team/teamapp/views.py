from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
from .forms import ProductForm
from .models import Product
from django.core.paginator import Paginator

def vendor_dashboard(request):
    success = False

    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            form = ProductForm()  # Reset form after submission
            success = True
    else:
        form = ProductForm()

    # Product list and pagination
    products_list = Product.objects.all().order_by('-created_at')
    paginator = Paginator(products_list, 10)
    page = request.GET.get('page')
    products = paginator.get_page(page)

    # Dummy metrics
    total_revenue = 10000  # Replace with actual logic
    expected_revenue = 5000
    capital_stock = 3000
    out_of_stock = Product.objects.filter(quantity=0).count()

    context = {
        'form': form,
        'products': products,
        'success': success,
        'total_revenue': total_revenue,
        'expected_revenue': expected_revenue,
        'capital_stock': capital_stock,
        'out_of_stock': out_of_stock,
    }
    return render(request, 'vendor/dashboard.html', context)
