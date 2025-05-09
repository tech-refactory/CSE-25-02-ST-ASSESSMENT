from django.shortcuts import render, redirect
from .models import *
from django.contrib import messages
from django.contrib.humanize.templatetags.humanize import intcomma
from .forms import *

# Create your views here.
def index(request):
    total_sales = 50000000
    total_orders = 15000000
    products = Product.objects.all().order_by('-created_at')
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            product = form.save()
            messages.success(request, 'Product created successfully!')
            return redirect('product-detail', pk=product.pk)
    else:
        form = ProductForm()

    context = {
        'form': form,
    }

    return render(request, 'index.html', {'form': form})

   