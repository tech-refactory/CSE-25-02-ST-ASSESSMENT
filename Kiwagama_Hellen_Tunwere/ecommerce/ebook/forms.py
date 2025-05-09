from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].error_messages = {
                'required': 'Invalid field',
                'invalid': 'Invalid field'
            }

    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']
        widgets = {
            'name': forms.TextInput(attrs={
                'placeholder': 'Product Name', 
                'class': 'form-control'
            }),
            'category': forms.TextInput(attrs={
                'placeholder': 'Category', 
                'class': 'form-control'
            }),
            'price': forms.NumberInput(attrs={
                'placeholder': 'Price (UGX)', 
                'class': 'form-control',
                'min': '0'
            }),
            'quantity': forms.NumberInput(attrs={
                'placeholder': 'Quantity', 
                'class': 'form-control',
                'min': '0'
            }),
            'color': forms.TextInput(attrs={
                'placeholder': 'Color', 
                'class': 'form-control'
            }),
            'image': forms.ClearableFileInput(attrs={
                'class': 'form-control',
                'accept': 'image/*'
            }),
        }



        