from models import *
from django import forms

class VendorForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['product_name', 'category', 'price', 'quantity', 'color', 'image']
        