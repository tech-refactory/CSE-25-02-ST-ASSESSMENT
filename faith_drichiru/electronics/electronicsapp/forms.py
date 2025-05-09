from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Add CSS classes, required attributes, and placeholders
        placeholders = {
            'name': 'Enter product name',
            'category': 'Enter product category',
            'price': 'Enter price in UGX',
            'quantity': 'Enter quantity',
            'color': 'Enter product color',
            'image': 'Upload product image'
        }
        for field_name, field in self.fields.items():
            css_classes = ['form-control']
            if self.is_bound:  # If the form has been submitted
                if field_name in self.errors:
                    css_classes.append('error')
                elif field_name in self.cleaned_data:
                    css_classes.append('valid')
            
            field.widget.attrs.update({
                'class': ' '.join(css_classes),
                'required': 'required',
                'placeholder': placeholders[field_name]
            })

    def clean_name(self):
        name = self.cleaned_data.get('name')
        if len(name) < 3:
            raise forms.ValidationError("Product name must be at least 3 characters long")
        return name

    def clean_category(self):
        category = self.cleaned_data.get('category')
        if len(category) < 2:
            raise forms.ValidationError("Category must be at least 2 characters long")
        return category

    def clean_price(self):
        price = self.cleaned_data.get('price')
        if price <= 0:
            raise forms.ValidationError("Price must be greater than 0")
        if price > 1000000000:
            raise forms.ValidationError("Price cannot exceed 1,000,000,000")
        return price

    def clean_quantity(self):
        quantity = self.cleaned_data.get('quantity')
        if quantity < 0:
            raise forms.ValidationError("Quantity cannot be negative")
        if quantity > 1000000:
            raise forms.ValidationError("Quantity cannot exceed 1,000,000")
        return quantity

    def clean_color(self):
        color = self.cleaned_data.get('color')
        if len(color) < 2:
            raise forms.ValidationError("Color must be at least 2 characters long")
        return color

    def clean_image(self):
        image = self.cleaned_data.get('image')
        if image:
            if image.size > 5 * 1024 * 1024:  # 5MB limit
                raise forms.ValidationError("Image file too large (maximum 5MB)")
            valid_extensions = ['.jpg', '.jpeg', '.png']
            import os
            ext = os.path.splitext(image.name)[1].lower()
            if ext not in valid_extensions:
                raise forms.ValidationError("Unsupported file extension. Use .jpg, .jpeg or .png")
        return image