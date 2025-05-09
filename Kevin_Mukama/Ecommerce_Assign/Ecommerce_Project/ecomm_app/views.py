from django.shortcuts import render, redirect
from .forms import *
from .models import *
from django.db.models import Sum

# Create your views here.
def addproductView(request):
    if request.method == 'POST':
        form = AddProductForm(request.POST)
        if form.is_valid():
            form.save()
            """all_products = Product.objects.all().order_by('-id')
            return render(request, ".html", {'all_products': all_products})"""
            return redirect('addproductPath')
    
    elif request.method == 'GET':
        form = AddProductForm()
        

        products = Product.objects.all()

        total_revenue = 0
        for product in products:
            total_revenue += product.price * product.quantity
        
        out_of_stock = Product.objects.filter(quantity__lte=0).count()

        return render(request, 'mainpage.html', {
            'products': products,
            'total_revenue': total_revenue,
            'out_of_stock': out_of_stock,
            'form' : form
        })