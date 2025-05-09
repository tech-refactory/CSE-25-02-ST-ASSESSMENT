from django.shortcuts import render, redirect
from .models import *
from .forms import *
# Create your views here.

def homePage(request):
    stock = product.objects.all()
    total_amount = 0 
    for each in stock:
        total_amount += each.price
    sales_form = addStock(request.POST)
    if request.method == 'POST':
        if sales_form.is_valid():
            new_stock = sales_form.save(commit=False)
            new_stock.name = stock.name
            new_stock.category = stock.category
            new_stock.price = stock.price
            new_stock.quantity = stock.quantity
            sales_form.save()
        else:
            return redirect(failPage)    

    context = {
        'sales_form': sales_form,
        'stocks': stock,
        'sales': "{:,}".format(total_amount),
    }
    return render(request, 'index.html', context)

def failPage(request):

    return render(request, 'failPage.html')