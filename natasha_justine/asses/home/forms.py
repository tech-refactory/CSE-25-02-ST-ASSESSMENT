# forms.py
from django import forms
from .models import Product

class ProductForm(forms.Form):
    product_name = forms.CharField(label='Product Name')
    category = forms.CharField(label='Category')
    price = forms.DecimalField(label='Price (UGX)')
    quantity = forms.IntegerField(label='Quantity')
    color = forms.CharField(label='Color', required=False) # Example optional field
    upload_image = forms.FileField(label='Upload Image', required=False)

    def clean_product_name(self):
        product_name = self.cleaned_data['product_name']
        if len(product_name) < 3:
            raise forms.ValidationError("Product name must be at least 3 characters long.")
        return product_name

    def clean_price(self):
        price = self.cleaned_data['price']
        if price <= 0:
            raise forms.ValidationError("Price must be a positive value.")
        return price

    def clean_quantity(self):
        quantity = self.cleaned_data['quantity']
        if quantity < 0:
            raise forms.ValidationError("Quantity cannot be negative.")
        return quantity

    # Example of a cross-field validation
    def clean(self):
        cleaned_data = super().clean()
        quantity = cleaned_data.get('quantity')
        price = cleaned_data.get('price')

        if quantity is not None and price is not None and quantity > 100 and price < 1000:
            raise forms.ValidationError("For large quantities, the price should be at least 1000.")
        return cleaned_data