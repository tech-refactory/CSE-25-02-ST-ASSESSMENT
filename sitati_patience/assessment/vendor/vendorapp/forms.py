from .models import *
from django import forms

class VendorForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['product_name', 'category', 'price', 'quantity', 'color', 'image']
        widgets ={
            'product_name': forms.TextInput(attrs={'placeholder': 'Product Name'}),
            'category': forms.TextInput(attrs={'placeholder': 'Category'}),
            'price': forms.NumberInput(attrs={'placeholder': 'Price'}),
            'quantity': forms.NumberInput(attrs={'placeholder': 'Quantity'}),
            'color': forms.TextInput(attrs={'placeholder': 'Color'}),
        }