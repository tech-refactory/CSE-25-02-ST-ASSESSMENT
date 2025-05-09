from django.shortcuts import render, redirect
from .models import*
from .forms import SaleForm

# Create your views here.
# views.py
def chart(request):
    products = Product.objects.all()
    sales = Sale.objects.select_related('product')
    total_sales = sum(sale.get_total_price() for sale in sales)

    sale_form = SaleForm(request.POST or None)
    if request.method == 'POST' and sale_form.is_valid():
        sale = sale_form.save()
        product = sale.product
        product.quantity -= sale.quantity_sold
        product.save()
        return redirect('chart')

    context = {
        'products': products,
        'sales': sales,
        'total_sales': total_sales,
        'orders': 15000000,  
        'in_stock_value': sum(p.price * p.quantity for p in products),
        'out_of_stock_count': products.filter(quantity=0).count(),
        'sale_form': sale_form,
    }
    return render(request, 'salesapp/chart.html', context)