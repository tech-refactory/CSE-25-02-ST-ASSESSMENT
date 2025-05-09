from django import forms
from . models import*


from .models import Sale

from django import forms
from .models import Sale, Product  

class SaleForm(forms.ModelForm):
    
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Product Name'}),
            'category': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Category'}),
            'price': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Price'}),
            'quantity': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Quantity'}),
            'color': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Color'}),
            'image': forms.ClearableFileInput(attrs={'class': 'form-control'}),
        }
        error_messages = {
            'name': {'required': 'Invalid field'},
            'category': {'required': 'Invalid field'},
            'price': {'required': 'Invalid field'},
            'quantity': {'required': 'Invalid field '},
            'color': {'required': 'Invalid field'},
            'Image': {'required': 'Invalid field'},
            
        }