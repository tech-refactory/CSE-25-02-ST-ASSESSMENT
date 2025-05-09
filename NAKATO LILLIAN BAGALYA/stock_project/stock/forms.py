from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['product_name', 'category', 'price', 'quantity', 'color','image']
    
    def clean(self):
        cleaned_data = super().clean()
        for field, value in cleaned_data.items():
            if not value:
                raise forms.ValidationError(f"{field} cannot be empty")
        return cleaned_data