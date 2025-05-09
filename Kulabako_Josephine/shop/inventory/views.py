from django.shortcuts import render, redirect
from .models import*
from .forms import SaleForm
from django.contrib import messages

# Create your views here.
# views.py

def index(request):
    
    sale_form = SaleForm()
    products = Product.objects.filter(sold_at__isnull=False).order_by('-sold_at')

    if request.method == 'POST':
        sale_form = SaleForm(request.POST, request.FILES)
        if sale_form.is_valid():
            sale_form.save()
            messages.success(request, "Product added successfully!")
            sale_form = SaleForm()  
        else:
            messages.error(request, "Invalid field.") 

    context = {
        'sale_form': sale_form,
        'products': products,
    }
    return render(request, 'index.html', context)