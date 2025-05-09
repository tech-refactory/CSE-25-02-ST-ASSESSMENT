from django.shortcuts import render, redirect
from .forms import *
from .models import *

# Create your views here.
def addproductView(request):
    if request.method == 'POST':
        form = AddProductForm(request.POST)
        if form.is_valid():
            form.save()
            all_products = Product.objects.all().order_by('-id')
            return render(request, ".html", {'all_products': all_products})
            return redirect('addproductPath')
    
    else:
        form = AddProductForm()
        return render(request, "mainpage.html", {"form":form})



def cardsView(request):
    total_revenue