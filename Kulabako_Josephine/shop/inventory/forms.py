from django import forms
from django.core.validators import RegexValidator
from .models import Product  # Assuming both ProductForm and SaleForm use this model

class ProductForm(forms.ModelForm):
    name = forms.CharField(
        validators=[
            RegexValidator(
                regex='^[a-zA-Z0-9\s\-\+]+$',
                message='Product name can only contain letters, numbers, spaces, hyphens, and plus signs',
                code='invalid_name'
            )
        ],
        widget=forms.TextInput(attrs={'placeholder': 'Product Name'})
    )

    price = forms.DecimalField(
        min_value=0.01,
        widget=forms.NumberInput(attrs={'placeholder': 'Price (UGX)', 'step': '0.01'})
    )

    quantity = forms.IntegerField(
        min_value=0,
        widget=forms.NumberInput(attrs={'placeholder': 'Quantity'})
    )

    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']
        widgets = {
            'category': forms.Select(attrs={'class': 'form-control'}),
            'color': forms.Select(attrs={'class': 'form-control'}),
            'image': forms.FileInput(attrs={'style': 'padding: 8px;'}),
        }

    def clean_name(self):
        name = self.cleaned_data.get('name', '')
        if not name:
            raise forms.ValidationError("Product name is required")
        return name



class SaleForm(forms.ModelForm):
    class Meta:
        model = Product  
        fields = ['name', 'price', 'quantity']  
