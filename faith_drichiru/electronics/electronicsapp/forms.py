# forms.py
from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']
    
    def clean_name(self):
        name = self.cleaned_data.get('name')
        if not name or len(name.strip()) < 3:
            raise forms.ValidationError("Product name must be at least 3 characters long.")
        return name.strip()
    
    def clean_category(self):
        category = self.cleaned_data.get('category')
        if not category or len(category.strip()) < 2:
            raise forms.ValidationError("Category must be at least 2 characters long.")
        return category.strip()
    
    def clean_price(self):
        price = self.cleaned_data.get('price')
        if not price or price <= 0:
            raise forms.ValidationError("Price must be greater than 0.")
        return price
    
    def clean_quantity(self):
        quantity = self.cleaned_data.get('quantity')
        if quantity is None or quantity < 0:
            raise forms.ValidationError("Quantity cannot be negative.")
        return quantity
    
    def clean_color(self):
        color = self.cleaned_data.get('color')
        if not color or len(color.strip()) < 2:
            raise forms.ValidationError("Color must be at least 2 characters long.")
        return color.strip()
    
    def clean(self):
        cleaned_data = super().clean()
        # Add any cross-field validation here if needed in the future
        return cleaned_data
