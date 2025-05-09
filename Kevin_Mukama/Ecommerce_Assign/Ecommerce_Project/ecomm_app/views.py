from django.shortcuts import render, redirect
from .forms import *
from .models import *

from django.contrib import messages

# Create your views here.
def addproductView(request):
    if request.method == 'POST':
        form = AddProductForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Product has been added successfully!")
            return redirect('addproductPath')  
            
        else:
            products = Product.objects.all()

            total_revenue = 0
            for product in products:
                total_revenue += product.price * product.quantity


            return render(request, 'mainpage.html', {
                'form': form,
                'products': products,
                'total_revenue': total_revenue,
            })

    else:  
        form = AddProductForm()

        products = Product.objects.all()

        total_revenue = 0
        for product in products:
            total_revenue += product.price * product.quantity

        out_of_stock = Product.objects.filter(quantity__lte=0).count()

        return render(request, 'mainpage.html', {
            'form': form,
            'products': products,
            'total_revenue': total_revenue,
            'out_of_stock': out_of_stock
        })