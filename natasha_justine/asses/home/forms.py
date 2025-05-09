# Form for handling product creation and validation
from django import forms
from .models import Product


class ProductForm(forms.ModelForm):
    """Product Form: Handles input validation and styling for the product creation form"""
    name = forms.CharField(
        label='Product Name',
        min_length=3,
        max_length=255,
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': 'Product Name',
        })
    )
    category = forms.CharField(
        label='Category',
        min_length=2,
        max_length=255,
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': 'Category',
        })
    )
    price = forms.DecimalField(
        label='Price',
        min_value=0.01,
        max_value=1000000000,
        decimal_places=2,
        widget=forms.NumberInput(attrs={
            'class': 'form-input',
            'placeholder': 'Price',
            'step': '0.01',
        })
    )
    quantity = forms.IntegerField(
        label='Quantity',
        min_value=0,
        max_value=1000000,
        widget=forms.NumberInput(attrs={
            'class': 'form-input',
            'placeholder': 'Quantity',
        })
    )
    color = forms.CharField(
        label='Color',
        required=False,
        min_length=2,
        max_length=100,
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': 'Color (optional)',
        })
    )
    image = forms.ImageField(
        label='Upload Image',
        required=True,
        widget=forms.FileInput(attrs={
            'class': 'form-input',
            'accept': 'image/*',
        })
    )

    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']

    def clean_name(self):
        name = self.cleaned_data['name']
        name = name.strip()
        if not name[0].isalpha():
            raise forms.ValidationError("Product name must start with a letter.")
        if not all(c.isalnum() or c.isspace() or c in '-_' for c in name):
            raise forms.ValidationError("Product name can only contain letters, numbers, spaces, hyphens, and underscores.")
        return name

    def clean_category(self):
        category = self.cleaned_data['category']
        category = category.strip()
        if not category[0].isalpha():
            raise forms.ValidationError("Category must start with a letter.")
        if not all(c.isalnum() or c.isspace() for c in category):
            raise forms.ValidationError("Category can only contain letters, numbers, and spaces.")
        return category

    def clean_price(self):
        price = self.cleaned_data['price']
        if price <= 0:
            raise forms.ValidationError("Price must be greater than zero.")
        if price > 1000000000:
            raise forms.ValidationError("Price cannot exceed 1 billion.")
        return round(price, 2)  # Ensure 2 decimal places

    def clean_quantity(self):
        quantity = self.cleaned_data['quantity']
        if quantity < 0:
            raise forms.ValidationError("Quantity cannot be negative.")
        if quantity > 1000000:
            raise forms.ValidationError("Quantity cannot exceed 1 million units.")
        return quantity

    def clean_color(self):
        color = self.cleaned_data.get('color')
        if color:
            color = color.strip()
            if not color[0].isalpha():
                raise forms.ValidationError("Color must start with a letter.")
            if not all(c.isalpha() or c.isspace() for c in color):
                raise forms.ValidationError("Color can only contain letters and spaces.")
            # Convert to title case (e.g., "dark blue" -> "Dark Blue")
            color = color.title()
        return color

    def clean_image(self):
        image = self.cleaned_data.get('image')
        if not image:
            raise forms.ValidationError("An image is required for the product.")
        if image.size > 5 * 1024 * 1024:  # 5MB limit
            raise forms.ValidationError("Image file is too large. Maximum size is 5MB.")
        if not image.content_type.startswith('image/'):
            raise forms.ValidationError("Uploaded file must be an image.")
        allowed_types = ['image/jpeg', 'image/png', 'image/gif']
        if image.content_type not in allowed_types:
            raise forms.ValidationError("Only JPEG, PNG, and GIF images are allowed.")
        return image

    def clean(self):
        cleaned_data = super().clean()
        quantity = cleaned_data.get('quantity')
        price = cleaned_data.get('price')        # Cross-field validations
        if quantity is not None and price is not None:
            # For large quantities, ensure minimum price
            if quantity > 100 and price < 1000:
                raise forms.ValidationError("For large quantities (>100), the price should be at least 1000.")

        return cleaned_data