# forms.py
from django import forms
from .models import AddProduct

class AddProductForm(forms.ModelForm):
    class Meta:
        model = AddProduct
        fields = ['product_name', 'category', 'price', 'quantity', 'color', 'image']
        widgets = {
            'product_name': forms.TextInput(attrs={'class': 'form-control'}),
            'category': forms.TextInput(attrs={'class': 'form-control'}),
            'price': forms.NumberInput(attrs={'class': 'form-control'}),
            'quantity': forms.NumberInput(attrs={'class': 'form-control'}),
            'color': forms.TextInput(attrs={'class': 'form-control'}),
            'image': forms.ClearableFileInput(attrs={'class': 'form-control'}),
        }

    def product(self):
        product_data = super().product()

        for field in ['product_name', 'category', 'price', 'quantity', 'color']:
            value = product_data.get(field)
            if not value:
                self.add_error(field, "This field cannot be empty.")

        price = product_data.get('price')
        quantity = product_data.get('quantity')

        if price is not None and price <= 0:
            self.add_error('price', "Price must be a positive number.")
        if quantity is not None and quantity <= 0:
            self.add_error('quantity', "Quantity must be greater than 0.")

        return product_data
