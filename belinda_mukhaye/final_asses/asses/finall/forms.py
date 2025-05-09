from django.forms import ModelForm
from django import forms
from django.core.exceptions import ValidationError
from .models import Product

class AddProductForm(ModelForm):
    class Meta:
        model = Product
        fields = '__all__'
        # You can also specify widgets to customize how form fields are rendered
        widgets = {
            # Example: 'name': forms.TextInput(attrs={'class': 'form-control'})
        }
    
    def clean_name(self):
        """Validate the name field"""
        name = self.cleaned_data.get('name')
        if name:
            # Check if name is too short
            if len(name) < 3:
                raise ValidationError("Product name must be at least 3 characters long.")
            
            # Check if name already exists (case insensitive)
            if Product.objects.filter(name__iexact=name).exclude(id=self.instance.id).exists():
                raise ValidationError("A product with this name already exists.")
        
        return name
    
    def clean_price(self):
        """Validate the price field"""
        price = self.cleaned_data.get('price')
        if price is not None:
            if price <= 0:
                raise ValidationError("Price must be greater than zero.")
        return price
    
    def clean(self):
        """Perform cross-field validations"""
        cleaned_data = super().clean()
        
        # Example of validating multiple fields together
        stock = cleaned_data.get('stock')
        in_stock = cleaned_data.get('in_stock', False)
        
        if stock is not None and stock <= 0 and in_stock:
            self.add_error('in_stock', 
                          "Product cannot be marked as in stock when stock quantity is zero or negative.")
        
        return cleaned_data