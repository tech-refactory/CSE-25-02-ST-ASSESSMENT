from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'price', 'quantity']

    # Optional: Custom validation can be added here if needed
    def clean(self):
        cleaned_data = super().clean()
        name = cleaned_data.get('name')
        price = cleaned_data.get('price')
        quantity = cleaned_data.get('quantity')

        if not name or not price or not quantity:
            raise forms.ValidationError("All fields are required.")

        if price <= 0:
            self.add_error('price', 'Price must be greater than 0.')

        if quantity < 0:
            self.add_error('quantity', 'Quantity cannot be negative.')

        return cleaned_data
