# Main view controller for the vendor dashboard
from django.shortcuts import render, redirect
from django.contrib import messages
from decimal import Decimal
from .forms import ProductForm
from .models import Product

def indexpage(request):
    """
    Main dashboard view that handles:
    1. Displaying product list and statistics
    2. Processing new product submissions with validation
    3. Calculating dashboard metrics and inventory status
    """
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            try:
                product = form.save()
                messages.success(request, f"Product '{product.name}' has been successfully added to your inventory!")
                return redirect('indexpage')
            except Exception as e:
                messages.error(request, f"Error saving product: {str(e)}")
        else:
            messages.error(request, "Please correct the errors below.")
    else:
        form = ProductForm()
      # Get all products, ordered by newest first (using created_at timestamp)
    products = Product.objects.all().order_by('-created_at')
    
    # Calculate current stock value and out of stock items
    in_stock_value = sum(product.price * product.quantity for product in products)
    out_of_stock_count = products.filter(quantity=0).count()
    
    # Simulate sales and orders (for demonstration)
    total_sales = sum(product.price * Decimal('0.8') for product in products)  # 80% of stock value
    total_orders = sum(product.price * Decimal('0.2') for product in products)  # 20% of stock value
    
    context = {
        'form': form,
        'products': products,
        'total_sales': total_sales,
        'total_orders': total_orders,
        'in_stock_value': in_stock_value,
        'out_of_stock_count': out_of_stock_count,
    }
    
    return render(request, 'index.html', context)