from django.shortcuts import render
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.db.models import Sum, Count, F, Q
from django.contrib import messages
from .models import Product, Order, Sale
from .forms import ProductForm


# Create your views here.

def dashboard(request):
    # Calculate dashboard metrics
    total_sales = Sale.objects.aggregate(total=Sum('total_price'))['total'] or 0
    expected_revenue = Order.objects.filter(status__in=['Pending', 'Processing']).aggregate(total=Sum('total_price'))['total'] or 0
    capital_in_stock = Product.objects.annotate(value=F('price') * F('quantity')).aggregate(total=Sum('value'))['total'] or 0
    out_of_stock = Product.objects.filter(quantity=0).count()
    
    # Get all products
    products = Product.objects.all().order_by('-created_at')
    
    # Handle form submission
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({'success': True})
            messages.success(request, 'Product added successfully!')
            return redirect('dashboard')
    else:
        form = ProductForm()
    
    context = {
        'form': form,
        'products': products,
        'total_sales': total_sales,
        'expected_revenue': expected_revenue,
        'capital_in_stock': capital_in_stock,
        'out_of_stock': out_of_stock,
    }
    
    return render(request, 'vendor/dashboard.html', context)