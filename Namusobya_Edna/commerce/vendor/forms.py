from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'image']
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Add placeholders and classes to form fields
        self.fields['name'].widget.attrs.update({
            'placeholder': 'Enter product name',
            'class': 'form-control'
        })
        self.fields['category'].widget.attrs.update({
            'class': 'form-control'
        })
        self.fields['price'].widget.attrs.update({
            'placeholder': 'Enter price',
            'class': 'form-control'
        })
        self.fields['price'].widget.attrs.update({
            'placeholder': 'Enter price',
            'class': 'form-control'
        })
        self.fields['quantity'].widget.attrs.update({
            'placeholder': 'Enter quantity',
            'class': 'form-control'
        })
        self.fields['image'].widget.attrs.update({
            'class': 'form-control-file',
            'style': 'display: none;',
            'id': 'productImage'
        })
    def clean(self):
        cleaned_data = super().clean()
        # Validate that no field is empty
        for field_name, field_value in cleaned_data.items():
            if field_name != 'image' and not field_value:
                self.add_error(field_name, "This field cannot be empty")
        return cleaned_data
        