from django.shortcuts import render, redirect
from .models import *
from .forms import *
from django.contrib import messages

# Create your views here.


def dashboard(request):
    products = Product.objects.order_by('-created_at')
    form = ProductForm()

    
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Form has been successfully submitted.")
            return redirect('dashboard')
        else:
            messages.error(request, "Please correct the errors below.")

    
    sales = 50000000  
    orders = 15000000
    in_stock = sum([p.price * p.quantity for p in Product.objects.all()])
    out_of_stock = Product.objects.filter(quantity=0).count()

    return render(request, 'dashboard.html', {
        'form': form,
        'products': products,
        'sales': sales,
        'orders': orders,
        'in_stock': in_stock,
        'out_of_stock': out_of_stock,
    })
