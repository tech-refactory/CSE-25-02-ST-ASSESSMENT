from django.shortcuts import render, redirect
from e_commerceapp.models import Product
# Create your views here.

# A view for handling the e-commerce application.
def index(request):
    if request.method == 'POST':
        data = request.POST

        # Manually data from the post request
        name = data.get('name')
        category = data.get('category')
        price = data.get('price')
        quantity = data.get('quantity')
        color = data.get('color')
        image = request.FILES.get('image')

        # Validation to check weather the form meets the requirements to create a product instance.
        if name and quantity:
            product = Product(
                name = name, 
                category = category,
                price = price,
                quantity = quantity,
                color = color,
                image = image,
            ) 

            # Save the product instance to the database.
            product.save()

            # Redirect to the same page after saving the product. 
            return redirect('index')
        else:
            # Give an error if the requierments a not met.
            error = 'product and quantity a required'

            products = Product.objects.all()

            context = {
                'all_products' : products, 
                'error' : error,
            }


            return render(request, 'index.html', context)                  
    return render(request, 'index.html')  