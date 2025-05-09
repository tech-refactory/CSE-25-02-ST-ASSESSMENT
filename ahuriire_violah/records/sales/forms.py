from django import forms
from .models import Product
from django.core.exceptions import ValidationError

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Product Name'}),
            'category': forms.TextInput(attrs={'placeholder': 'Category'}),
            'price': forms.NumberInput(attrs={'min': 1, 'placeholder': 'Price (UGX)'}),
            'quantity': forms.NumberInput(attrs={'min': 1, 'placeholder': 'Available Quantity'}),
            'color': forms.TextInput(attrs={'placeholder': 'Color'}),
            'image': forms.ClearableFileInput(attrs={
                'placeholder':'Upload image',
                'class': 'p-2 rounded w-full',
                'required': True
            }),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for name, field in self.fields.items():
            field.required = True  # Ensuring  all fields are required
            css_classes = 'p-2 rounded w-full '

            if self.is_bound:
                if self.errors.get(name):
                    css_classes += 'border border-red-500'
                else:
                    css_classes += 'border border-green-500'
            else:
                css_classes += 'border border-gray-300'

            existing_attrs = field.widget.attrs
            field.widget.attrs = {
                **existing_attrs,
                'class': css_classes,
                'required': 'required',
            }

    def clean_price(self):
        price = self.cleaned_data.get('price')
        if price < 1:
            raise ValidationError("Price must be at least 1 UGX.")
        return price

    def clean_quantity(self):
        quantity = self.cleaned_data.get('quantity')
        if quantity < 1:
            raise ValidationError("Quantity must be at least 1.")
        return quantity

    def clean_image(self):
        image = self.cleaned_data.get('image')
        if not image:
            raise ValidationError("Product image is required.")
        return image

    def clean(self):
        cleaned_data = super().clean()
        for name in self.fields:
            if not cleaned_data.get(name):
                self.add_error(name, "This field is required.")
        return cleaned_data
