from django.shortcuts import render
from .forms import ProductForm
from .models import Product
from django.db.models import Sum

# Create your views here.
def product_page(request):
    success_message = None

    product = Product.objects.all().order_by('-id')  # Fetch all products and order by ID in descending order
    
    sales = Product.objects.count()

    total_sales = Product.objects.aggregate(total_sales=Sum('price' * 'quantity'))

    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            success_message = "Product has been added successfully!"
            form = ProductForm()  # reset the form after successful submission
    else:
        form = ProductForm()

    context = {
        'form': form,
        'success_message': success_message,
        'product': product,
        'total_sales': total_sales['total_sales'],
        'sales': sales,
    }

    return render(request, 'page.html', context)

