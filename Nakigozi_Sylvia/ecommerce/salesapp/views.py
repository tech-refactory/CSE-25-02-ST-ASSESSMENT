from django.shortcuts import render, redirect
from .forms import ProductForm
from .models import Product

def add_product_view(request):
    form = ProductForm()
    success = False

    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            success = True
            form = ProductForm()  

    
    products = Product.objects.all().order_by('-id')

    return render(request, 'salesapp/add_product.html', {
        'form': form,
        'success': success,
        'products': products
    })

