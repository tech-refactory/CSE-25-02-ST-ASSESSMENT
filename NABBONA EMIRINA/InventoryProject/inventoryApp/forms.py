from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Product Name'}),
            'category': forms.TextInput(attrs={'class': 'form-control validate'}),
            'price': forms.NumberInput(attrs={'class': 'form-control validate'}),
            'quantity': forms.NumberInput(attrs={'class': 'form-control validate'}),
            'color': forms.TextInput(attrs={'class': 'form-control validate'}),
            'image': forms.ClearableFileInput(attrs={'class': 'form-control validate'}),
        }

