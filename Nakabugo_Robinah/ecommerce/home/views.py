from django.shortcuts import render

# Create your views here.
# views.py
from django.shortcuts import render, redirect
from .models import Product
from .forms import ProductForm


def home(request):
    products = Product.objects.all()
    form = ProductForm()

    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('index')

    return render(request, 'index.html', {
        'products': products,
        'form': form,
        'title': 'Home',
        'heading': 'Welcome to Our E-commerce Store',
        'subheading': 'Find the best products at unbeatable prices!',

    })