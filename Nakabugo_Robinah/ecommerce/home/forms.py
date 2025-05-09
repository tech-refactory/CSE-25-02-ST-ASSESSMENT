from django import forms

from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Product Name'}),
            'category': forms.TextInput(attrs={'placeholder': 'Category'}),
            'price': forms.NumberInput(attrs={'placeholder': 'Price'}),
            'quantity': forms.NumberInput(attrs={'placeholder': 'Quantity'}),
            'color': forms.TextInput(attrs={'placeholder': 'Color'}),
        }