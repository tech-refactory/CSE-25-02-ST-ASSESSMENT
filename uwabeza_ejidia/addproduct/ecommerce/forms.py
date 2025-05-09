from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['product_name', 'category', 'price', 'quantity', 'color', 'image']
        widgets = {
            'product_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Product Name', 'required': 'required'}),
            'category': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Category', 'required': 'required'}),
            'price': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Price', 'step': '0.01', 'min': '0.01', 'required': 'required'}),
            'quantity': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Quantity', 'min': '1', 'required': 'required'}),
            'color': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Color'}),
            'image': forms.ClearableFileInput(attrs={'class': 'form-control'}),
        }

    def clean(self):
        cleaned_data = super().clean()
        for field in ['product_name', 'category', 'price', 'quantity']:
            if not cleaned_data.get(field):
                self.add_error(field, "This field is required.")
        price = cleaned_data.get('price')
        quantity = cleaned_data.get('quantity')
        if price is not None and price <= 0:
            self.add_error('price', "Price must be greater than 0.")
        if quantity is not None and quantity < 0:
            self.add_error('quantity', "Quantity must be 0 or greater.")
        return cleaned_data