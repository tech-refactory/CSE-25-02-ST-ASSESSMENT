from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ["product_name", "category", "price", "quantity", "color", "image"]
        widgets = {
            "product_name": forms.TextInput(attrs={"class": "form-control", "placeholder": "Product Name", "required": True}),
            "category": forms.TextInput(attrs={"class": "form-control", "placeholder": "Category", "required": True}),
            "price": forms.NumberInput(attrs={"class": "form-control", "placeholder": "Price", "step": "0.01", "required": True}),
            "quantity": forms.NumberInput(attrs={"class": "form-control", "placeholder": "Quantity", "min": "1", "required": True}),
            "color": forms.TextInput(attrs={"class": "form-control", "placeholder": "Color", "required": True}),
            "image": forms.FileInput(attrs={"class": "form-control", "accept": "image/*", "required": True}),
        }

    def clean_price(self):
        price = self.cleaned_data.get("price")
        if price is None or price <= 0:
            raise forms.ValidationError("Price must be greater than zero.")
        return price

    def clean_quantity(self):
        quantity = self.cleaned_data.get("quantity")
        if quantity is None or quantity < 1:
            raise forms.ValidationError("Quantity must be at least 1.")
        return quantity