from django.shortcuts import render, redirect
from .models import Product
from .forms import ProductForm


# Create your views here.


def vendors_products(request):
   products = Product.objects.all()
   form = ProductForm()
   if request.method == "POST":
      form = ProductForm(request.POST)
      if form.is_valid():
         form.save()
         form = ProductForm()
         success = True 
      else:
         success = False
   else:
      success = None
   context = {
      "products": products,
      "form": form,
      "success": success,
   }
   return redirect("vendors_products")