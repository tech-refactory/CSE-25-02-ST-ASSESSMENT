# forms.py
from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'

    import re
    def clean_product_name(self):
        product_name = self.cleaned_data.get('product_name').strip()
        if not product_name:
            raise forms.ValidationError("Product name cannot be empty.")

        if len(product_name) < 3:
            raise forms.ValidationError("Product name must be at least 3 characters long.")

        if not re.match(r'^[A-Za-z0-9 ]+$', product_name):
            raise forms.ValidationError("Product name can only contain letters, numbers, and spaces.")
            return product_name

    def clean_category(self):
        category = self.cleaned_data.get('category').strip().title()
    
        if not category:
            raise forms.ValidationError("Category cannot be empty.")
            allowed_categories = ['Electronics', 'Clothing', 'Furniture', 'Groceries']
        if category not in allowed_categories:
            raise forms.ValidationError(f"Category must be one of: {', '.join(allowed_categories)}")
    
        return category

    def clean_price(self):
        price = self.cleaned_data.get('price')
        if price <= 0:
            raise forms.ValidationError("Price must be a positive number.")
        return price

    def clean_quantity(self):
        quantity = self.cleaned_data.get('quantity')
        if quantity is not None and quantity < 0:
            raise forms.ValidationError("Quantity cannot be negative.")
        return quantity

    
    def clean_color(self):
        color = self.cleaned_data.get('color').strip().title()

        if not color:
            raise forms.ValidationError("Color cannot be empty.")

        allowed_colors = ['Red', 'Blue', 'Green', 'Black', 'White']
        if color not in allowed_colors:
            raise forms.ValidationError(f"Color must be one of: {', '.join(allowed_colors)}")

        return color

    def clean_image(self):
        image = self.cleaned_data.get('image')

        if not image:
            raise forms.ValidationError("No image provided.")

        if not image.content_type.startswith('image'):
            raise forms.ValidationError("Uploaded file is not an image.")

        if image.size > 2 * 1024 * 1024:  # 2MB limit
            raise forms.ValidationError("Image file too large ( > 2MB ).")

        return image


 