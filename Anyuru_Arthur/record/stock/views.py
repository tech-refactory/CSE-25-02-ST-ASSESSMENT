from django.shortcuts import render
from .models import *
from .forms import *
# Create your views here.

def homePage(request):
    stock = product.objects.all()
    total_amount = 0 
    for each in stock:
        total_amount += each.price


    context = {
        'stocks': stock,
        'sales': "{;,}".format(total_amount),
    }
    return render(request, 'index.html', context)

