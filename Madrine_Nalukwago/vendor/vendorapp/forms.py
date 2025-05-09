from django import forms
from .models import Product
import re

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'

    def clean_product_name(self):
        product_name = self.cleaned_data.get('product_name', '').strip()
        if not product_name:
            raise forms.ValidationError("Product name cannot be empty.")

        if len(product_name) < 3:
            raise forms.ValidationError("Product name must be at least 3 characters long.")

        if not re.match(r'^[A-Za-z0-9 ]+$', product_name):
            raise forms.ValidationError("Product name can only contain letters, numbers, and spaces.")

        return product_name

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
        color = self.cleaned_data.get('color', '').strip().title()

        if not color:
            raise forms.ValidationError("Color cannot be empty.")

        allowed_colors = ['Red', 'Blue', 'Green', 'Black', 'White']
        if color not in allowed_colors:
            raise forms.ValidationError(f"Color must be one of: {', '.join(allowed_colors)}")

        return color

    def clean_image(self):
        upload_image = self.cleaned_data.get('upload_image')

        if not upload_image:
            raise forms.ValidationError("No image provided.")

        if not upload_image.content_type.startswith('image/'):
            raise forms.ValidationError("Uploaded file is not a valid image.")

        if upload_image.size > 2 * 1024 * 1024:
            raise forms.ValidationError("Image file too large ( > 2MB ).")

        return upload_image
