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
            sales_form.save()
            return redirect('success/')    
        else:
            return redirect('')   

    context = {
        'sales_form': sales_form,
        'stocks': stock,
        'sales': "{:,}".format(total_amount),
    }
    return render(request, 'index.html', context)

def failPage(request):
    stock = product.objects.all()
    total_amount = 0 
    for each in stock:
        total_amount += each.price
    sales_form = addStock(request.POST)
    if request.method == 'POST':
        if sales_form.is_valid():
            sales_form.save()
            return redirect('success/')    
        else:
            return redirect('')    

    context = {
        'sales_form': sales_form,
        'stocks': stock,
        'sales': "{:,}".format(total_amount),
    }
    return render(request, 'failPage.html', context)
