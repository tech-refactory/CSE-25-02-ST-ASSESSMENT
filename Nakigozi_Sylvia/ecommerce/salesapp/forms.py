from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Product Name'}),
            'category': forms.TextInput(attrs={'placeholder': 'Category'}),
            'price': forms.NumberInput(attrs={'placeholder': 'Price'}),
            'quantity': forms.NumberInput(attrs={'placeholder': 'Quantity'}),
            'color': forms.TextInput(attrs={'placeholder': 'Color'}),
        }

    def __init__(self, *args, **kwargs):
        super(ProductForm, self).__init__(*args, **kwargs)

        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'form-control'  

        
        if self.is_bound:
            for field_name, field in self.fields.items():
                if self.errors.get(field_name):
                    field.widget.attrs['class'] += ' is-invalid'
                elif self.data.get(field_name):
                    field.widget.attrs['class'] += ' is-valid'

    
    def clean_name(self):
        name = self.cleaned_data.get('name')
        if not name.isalpha():
            raise forms.ValidationError("Name must contain only alphabetic characters.")
        if len(name) < 3:
            raise forms.ValidationError("Name must be at least 3 characters long.")
        return name

    
    def clean_price(self):
        price = self.cleaned_data.get('price')
        if price is None or price <= 0:
            raise forms.ValidationError("Price must be a positive number.")
        return price

    
    def clean_quantity(self):
        quantity = self.cleaned_data.get('quantity')
        if quantity is None or quantity <= 0:
            raise forms.ValidationError("Quantity must be a positive number.")
        return quantity

    
    def clean_color(self):
        color = self.cleaned_data.get('color')
        if not color.isalpha():
            raise forms.ValidationError("Color must contain only alphabetic characters.")
        return color
