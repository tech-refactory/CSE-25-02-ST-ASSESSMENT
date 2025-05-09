from django.shortcuts import render, redirect
from .forms import *
# Create your views here.
from django.contrib import messages


def product(requset):
    if requset.method =='POST':
        forms = AddProductForm(requset.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Form has been submitted successfully')
            return redirect('/')
        else:
             messages.error(request, 'lnvalid field')
        else:
        form = AddProductForm()
    return render(request, 'product.html', {'form': form})

