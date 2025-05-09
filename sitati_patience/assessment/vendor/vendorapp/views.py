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

    products = Product.objects.all().order_by('-id') # -id gives precedence to the last one and the vice versa is true
    total_sales = Product.objects.aggregate(total=Sum('price'))['total'] or 0
    total_orders = Product.objects.aggregate(expected=Sum(models.F('price') * models.F('quantity')))['expected'] or 0
    total_stock = Product.objects.aggregate(stock=Sum(models.F('price') * models.F('quantity')))['stock'] or 0
    out_of_stock_count = Product.objects.filter(quantity=0).count()

    context = {
        'form': form,
        'products': products,
        'total_sales': total_sales,
        'total_orders': total_orders,
        'total_stock': total_stock,
        'out_of_stock_count': out_of_stock_count,
        'success': success
    }
    return render(request, 'dashboard.html', context)
