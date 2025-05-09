from django.shortcuts import render, redirect
from .forms import *
from .models import *
from django.db.models import Sum

# Create your views here.


def dashboard(request):
    form = VendorForm()
    success = False
    if request.method == 'POST':
        form = VendorForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('/?success=true')

    if request.GET.get('success'):
        success = True

    products = Product.objects.all().order_by('-id') 
    total_sales = Product.objects.aggregate(total=Sum('price'))['total'] or 0
    out_of_stock_count = Product.objects.filter(quantity=0).count()
    in_stock_count = Product.objects.filter(quantity__gt=0).count() 
    orders = Product.objects.count()
    context = {
        'form': form,
        'products': products,
        'total_sales': total_sales,
        'out_of_stock_count': out_of_stock_count,
        'success': success,
        'orders' : orders,
        'in_stock_count': in_stock_count
    }
    return render(request, 'dashboard.html', context)
