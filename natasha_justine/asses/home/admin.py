# Admin Configuration for Product Management
from django.contrib import admin
from .models import Product

# Register Product model with the admin interface
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'quantity', 'color')  # Fields to display in list view
    search_fields = ('name', 'category')  # Enable search by name and category
    list_filter = ('category',)  # Add category filter in sidebar
