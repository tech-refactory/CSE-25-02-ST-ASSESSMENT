from django.forms import ModelForm
from .models import *
from django import forms
class AddproductForm(ModelForm):
    class Meta:
        model = Product
        fields = '__all__'
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Product name'}),
            'Category': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Category'}),
            'Price': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Price'}),
            'Quantity': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Quantity'}),
            'color': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Color'}),
            'image': forms.ClearableFileInput(attrs={'class': 'form-control', 'placeholder': 'Choose Image'}),
        }