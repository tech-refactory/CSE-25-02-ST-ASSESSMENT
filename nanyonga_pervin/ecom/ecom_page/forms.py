from .models import Product
from django import forms

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'


def clean_price(self):
    price = self.cleaned_data.get('price')

    if not price:
        raise forms.ValidationError("Price is required.")
    
    if price <= 0:
        raise forms.ValidationError("Price must be greater than zero.")
    
    if not price.isdigit():
        raise forms.ValidationError("Price must be a number.")

    return price


def clean_quantity(self):
    quantity = self.cleaned_data.get('quantity')

    if not quantity:
        raise forms.ValidationError("Quantity is required.")
    
    if quantity <= 0:
        raise forms.ValidationError("Quantity must be greater than zero.")
    
    if not quantity.isdigit():
        raise forms.ValidationError("Quantity must be a number.")

    return quantity

def product_name(self):
    product_name = self.cleaned_data.get('product_name')
    if not product_name:
        raise forms.ValidationError("Product name is required.")
    
    if len(product_name) < 3:
        raise forms.ValidationError("Product name must be at least 3 characters long.")
    
    if product_name.isdigit():
            raise forms.ValidationError("Product name cannot be only numbers.")


    return product_name


def clean_category(self):
        category = self.cleaned_data.get('category')

        if not category:
            raise forms.ValidationError("Category is required.")
        
        valid_choices = [choice[0] for choice in Product.CATEGORY_CHOICES]
        if category not in valid_choices:
            raise forms.ValidationError("Invalid category selected.")
        return category


def clean_image(self):
        image = self.cleaned_data.get('image')

        if not image:
            raise forms.ValidationError("No image uploaded.")
        
        return image

def clean_color(self):
        color = self.cleaned_data.get('color')

        if not color:
            raise forms.ValidationError("Color is required.")
        
        return color