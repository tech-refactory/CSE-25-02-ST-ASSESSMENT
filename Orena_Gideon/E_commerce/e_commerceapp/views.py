from django.shortcuts import render, redirect
from e_commerceapp.models import Product
# Create your views here.

# A view for handling the e-commerce application.
def index(request):

    # Define error
    error = None
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
    # Fetch all products from the database
    products = Product.objects.all()

    # Dashboard data calculations.
    # Total revenue.
    total_revenue = sum(product.price * product.quantity for product in products)
    # Expected revenue (assume it is one per product ).
    expected_revenue = sum(product.price for product in products) 
    # Capital in stock.
    capital_in_stock = sum(product.price * product.quantity for product in products if product.quantity > 0) 
    # number of products out of stock.
    out_of_stock = products.filter(quantity=0).count()
    # Use a context to pass the products table in the tampate.


    
    # pass the products, error and dashboard caluculations to the template. 
    context = {
        'all_products' : products, 
        'error' : error,
        'dashboard' : {
            'total_revenue' : total_revenue, 
            'expected_revenue' : expected_revenue,
            'capital_in_stock' : capital_in_stock,
            'out_of_stock' : out_of_stock,
        },
    }


    return render(request, 'index.html', context)                  
    