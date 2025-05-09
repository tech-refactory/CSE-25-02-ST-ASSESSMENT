from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ProductForm
from .models import Product

def add_product(request):
    form = ProductForm(request.POST or None, request.FILES or None)

    if request.method == "POST":
        if form.is_valid():
            form.save()
            messages.success(request, "Product added successfully!")
            return redirect("add_product")
        else:
            messages.error(request, "There was an error saving the product.")
            print("Form errors:", form.errors)  # Debug output

    products = Product.objects.all()

    return render(request, 'add_product.html', {'form': form, 'products': products})
