from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Product Name', 'class': 'form-control'}),
            'category': forms.TextInput(attrs={'placeholder': 'Category', 'class': 'form-control'}),
            'price': forms.NumberInput(attrs={'placeholder': 'Price', 'class': 'form-control'}),
            'quantity': forms.NumberInput(attrs={'placeholder': 'Quantity', 'class': 'form-control'}),
            'color': forms.TextInput(attrs={'placeholder': 'Color', 'class': 'form-control'}),
        }
