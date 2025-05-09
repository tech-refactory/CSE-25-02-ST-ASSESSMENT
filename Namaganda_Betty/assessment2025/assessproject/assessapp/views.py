from django.shortcuts import render
from .models import Product
#from .forms import ProductForm


# Create your views here.


def product_list(request):
    products = Product.objects.all()
    total_sales = sum(product.price * product.quantity for product in products)
    total_orders = products.count()
    total_in_stock = sum(product.quantity for product in products)
    out_of_stock = products.filter(quantity=0).count()
    context = {
        'products': products,
        'total_sales': total_sales,
        'total_orders': total_orders,
        'total_in_stock': total_in_stock,
        'out_of_stock': out_of_stock,
    }
    return render(request, 'product_list.html', context)

#def add_product(request):
    #if request.method == 'POST':
       # form = ProductForm(request.POST)
        #if form.is_valid():
            #form.save()
           # return redirect('product_list')
   # else:
        #form = ProductForm()
    #return render(request, 'inventory/add_product.html', {'form': form})

