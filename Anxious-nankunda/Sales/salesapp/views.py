from django.shortcuts import render, redirect
from .models import*
from .forms import SaleForm
from django.contrib import messages

# Create your views here.
# views.py
def chart(request):
    products = Product.objects.all()
    sales = Sale.objects.select_related('product')
    total_sales = sum(sale.get_total_price() for sale in sales)

    if request.method == 'POST':
        sale_form = SaleForm(request.POST, request.FILES)
        if sale_form.is_valid():
            sale = sale_form.save()
            product = sale.product
            product.quantity -= sale.quantity_sold
            product.save()
            messages.success(request, "Sale recorded successfully!")
            return redirect('chart')
        # If form is invalid, the errors will be sent to the template
    else:
        sale_form = SaleForm()

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