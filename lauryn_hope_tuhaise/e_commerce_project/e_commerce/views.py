from django.shortcuts import render
from .models import *
from django.contrib import messages
from django.contrib.humanize.templatetags.humanize import intcomma

# Create your views here.
def index(request):
    product = Product.objects.all()
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            product = form.save()
            messages.success(request, 'Product created successfully!')
            return redirect('product-detail', pk=product.pk)
    else:
        form = ProductForm()
    return render(request, 'e_commerce/product_form.html', {'form': form})

    return render(request, 'index.html')