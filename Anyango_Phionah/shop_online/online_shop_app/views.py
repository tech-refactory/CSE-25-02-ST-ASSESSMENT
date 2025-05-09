from django.shortcuts import render
from .models import Product

# Create your views here.
from django.shortcuts import render, redirect
from .forms import ProductForm
from .models import Product

# View to create a new product
def create_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('product_list')
    else:
        form = ProductForm()
    return render(request, 'create_product.html', {'form': form})

# View to list all products
def product_list(request):
    products = Product.objects.all()
    return render(request, 'product_list.html', {'products': products})


