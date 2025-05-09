from django import forms
from . models import*


from .models import Sale

from django import forms
from .models import Sale, Product  # Assuming you have these models

class SaleForm(forms.ModelForm):
    # Add extra fields that are in your template but not in your original fields list
    category = forms.CharField(required=True, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Category'}))
    price = forms.DecimalField(required=True, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Price'}))
    color = forms.CharField(required=True, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Color'}))
    image = forms.ImageField(required=True, widget=forms.FileInput(attrs={'class': 'form-control-file'}))
    
    class Meta:
        model = Sale
        fields = ['product', 'quantity_sold', 'category', 'price', 'color', 'image']

        widgets = {
            'product': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Product Name'}),
            'quantity_sold': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Quantity'}),
        }
        
        error_messages = {
            'product': {'required': 'Invalid field'},
            'category': {'required': 'Invalid field'},
            'price': {'required': 'Invalid field'},
            'quantity_sold': {'required': 'Invalid field'},
            'color': {'required': 'Invalid field'},
            'image': {'required': 'Invalid field'},
        }
    
    def clean_quantity_sold(self):
        """Validate quantity sold against available stock"""
        try:
            qty = self.cleaned_data['quantity_sold']
            product = self.cleaned_data.get('product')
            
            if product and qty > product.quantity:
                raise forms.ValidationError(f"Not enough stock available. Only {product.quantity} units in stock.")
            
            return qty
        except KeyError:
            
            return None