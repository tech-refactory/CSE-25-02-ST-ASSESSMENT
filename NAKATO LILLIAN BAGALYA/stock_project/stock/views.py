from django.shortcuts import render
from .models import *

# Create your views here.
def mystock(request):
    product = Product.objects.all().order_by('id')
    return render(request, "mystock.html", {'products': product})
    
        

