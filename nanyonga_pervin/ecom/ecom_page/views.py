from django.shortcuts import render
from .forms import ProductForm
from .models import Product


# Create your views here.
def product_page(request):
    success_message = None

    product = Product.objects.all().order_by('-id')  # Fetch all products and order by ID in descending order
    
    

    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            success_message = "Product has been added successfully!"
            form = ProductForm()  # reset the form after successful submission
    else:
        form = ProductForm()

    context = {
        'form': form,
        'success_message': success_message,
        'product': product,
        
    }

    return render(request, 'page.html', context)

