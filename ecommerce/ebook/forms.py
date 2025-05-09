
from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']
        
    def clean_name(self):
        name = self.cleaned_data.get('name')
        if not name:
            raise forms.ValidationError("Product name is required.")
        if len(name) < 3:
            raise forms.ValidationError("Product name must be at least 3 characters long.")
        if len(name) > 255:
            raise forms.ValidationError("Product name cannot exceed 255 characters.")
        # Check if name is unique
        if Product.objects.filter(name=name).exists():
            raise forms.ValidationError("A product with this name already exists.")
        return name

    def clean_category(self):
        category = self.cleaned_data.get('category')
        if not category:
            raise forms.ValidationError("Category is required.")
        if len(category) < 2:
            raise forms.ValidationError("Category must be at least 2 characters long.")
        if len(category) > 255:
            raise forms.ValidationError("Category cannot exceed 255 characters.")
        return category

    def clean_price(self):
        price = self.cleaned_data.get('price')
        if not price:
            raise forms.ValidationError("Price is required.")
        if price <= 0:
            raise forms.ValidationError("Price must be greater than 0.")
        if price > 1000000000:  # 1 billion UGX limit
            raise forms.ValidationError("Price cannot exceed 1,000,000,000 UGX.")
        return price

    def clean_quantity(self):
        quantity = self.cleaned_data.get('quantity')
        if quantity is None:
            raise forms.ValidationError("Quantity is required.")
        if quantity < 0:
            raise forms.ValidationError("Quantity cannot be negative.")
        if quantity > 1000000:  # 1 million items limit
            raise forms.ValidationError("Quantity cannot exceed 1,000,000 units.")
        return quantity

    def clean_color(self):
        color = self.cleaned_data.get('color')
        if not color:
            raise forms.ValidationError("Color is required.")
        if len(color) < 2:
            raise forms.ValidationError("Color must be at least 2 characters long.")
        if len(color) > 100:
            raise forms.ValidationError("Color cannot exceed 100 characters.")
        return color

    def clean_image(self):
        image = self.cleaned_data.get('image')
        if image:
            # Check file size - limit to 5MB
            if image.size > 5 * 1024 * 1024:
                raise forms.ValidationError("Image size cannot exceed 5MB.")
            # Check file type
            valid_extensions = ['.jpg', '.jpeg', '.png', '.gif']
            import os
            ext = os.path.splitext(image.name)[1].lower()
            if ext not in valid_extensions:
                raise forms.ValidationError("Only .jpg, .jpeg, .png, and .gif files are allowed.")
        return image

    def clean(self):
        cleaned_data = super().clean()
        # Cross-field validation example
        price = cleaned_data.get('price')
        quantity = cleaned_data.get('quantity')
        
        if price and quantity:
            total_value = price * quantity
            if total_value > 10000000000:  # 10 billion UGX limit
                raise forms.ValidationError(
                    "Total stock value (price × quantity) cannot exceed 10,000,000,000 UGX."
                )
