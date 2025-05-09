from django import forms
#from django.core.validators import MinValueValidator, MaxValueValidator
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color','image']