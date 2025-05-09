from django.forms import ModelForm
from .models import *
from django import forms

class AddProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']

    def clean_price(self):
        price = self.cleaned_data.get('price')
        if price is not None and price < 0:
            raise forms.ValidationError("Price cannot be negative.")
        return price

    def clean_quantity(self):
        quantity = self.cleaned_data.get('quantity')
        if quantity is not None and quantity < 0:
            raise forms.ValidationError("Quantity cannot be negative.")
        return quantity

    def clean(self):
        cleaned_data = super().clean()
        name = cleaned_data.get('name')
        if not name:
            raise forms.ValidationError("Product name is required.")