# Form for handling product creation and validation
from django import forms
from .models import Product

"""
Django Form for Product Management

This form handles the creation and validation of product entries in the inventory system.
It implements comprehensive validation rules for each field and cross-field validations
to ensure data integrity and business rules compliance.

Fields:
- name: Product name (3-255 chars, alphanumeric with spaces/hyphens/underscores)
- category: Product category (2-255 chars, alphanumeric with spaces)
- price: Product price (0.01-1B, with 2 decimal places)
- quantity: Stock quantity (0-1M units)
- color: Optional color specification (2-100 chars, letters and spaces only)
- image: Product image (JPEG/PNG/GIF, max 5MB)
"""
class ProductForm(forms.ModelForm):
    """Django Form for Product Management

    This form handles the creation and validation of product entries in the inventory system.
    It implements comprehensive validation rules for each field and cross-field validations
    to ensure data integrity and business rules compliance.

    Fields:
    - name: Product name (3-255 chars, alphanumeric with spaces/hyphens/underscores)
    - category: Product category (2-255 chars, alphanumeric with spaces)
    - price: Product price (0.01-1B, with 2 decimal places)
    - quantity: Stock quantity (0-1M units)
    - color: Optional color specification (2-100 chars, letters and spaces only)
    - image: Product image (JPEG/PNG/GIF, max 5MB)
    """

    # Field Definitions with custom widgets and validation rules
    name = forms.CharField(
        label='Product Name',
        min_length=3,
        max_length=255,
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': 'Product Name',
        })
    )

    # Category field with basic text validation
    category = forms.CharField(
        label='Category',
        min_length=2,
        max_length=255,
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': 'Category',
        })
    )

    # Price field with decimal validation and range checks
    price = forms.DecimalField(
        label='Price',
        min_value=0.01,
        max_value=1000000000,
        decimal_places=2,
        widget=forms.NumberInput(attrs={
            'class': 'form-input',
            'placeholder': 'Price',
            'step': '0.01',  # Allows for precise decimal input
        })
    )

    # Quantity field with integer validation
    quantity = forms.IntegerField(
        label='Quantity',
        min_value=0,
        max_value=1000000,
        widget=forms.NumberInput(attrs={
            'class': 'form-input',
            'placeholder': 'Quantity',
        })
    )

    # Optional color field with text validation
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

    # Required image field with file type and size validation
    image = forms.ImageField(
        label='Upload Image',
        required=True,
        widget=forms.FileInput(attrs={
            'class': 'form-input',
            'accept': 'image/*',  # Browser-side file type filtering
        })
    )

    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']

    def clean_name(self):
        """Validate and clean the product name.
        
        Validation rules:
        - Must start with a letter
        - Can contain letters, numbers, spaces, hyphens, and underscores
        - Leading/trailing whitespace is removed
        
        Returns:
            str: The cleaned product name
        Raises:
            ValidationError: If validation fails
        """
        name = self.cleaned_data['name']
        name = name.strip()
        if not name[0].isalpha():
            raise forms.ValidationError("Product name must start with a letter.")
        if not all(c.isalnum() or c.isspace() or c in '-_' for c in name):
            raise forms.ValidationError("Product name can only contain letters, numbers, spaces, hyphens, and underscores.")
        return name

    def clean_category(self):
        """Validate and clean the product category.
        
        Validation rules:
        - Must start with a letter
        - Can only contain letters, numbers, and spaces
        - Leading/trailing whitespace is removed
        
        Returns:
            str: The cleaned category name
        Raises:
            ValidationError: If validation fails
        """
        category = self.cleaned_data['category']
        category = category.strip()
        if not category[0].isalpha():
            raise forms.ValidationError("Category must start with a letter.")
        if not all(c.isalnum() or c.isspace() for c in category):
            raise forms.ValidationError("Category can only contain letters, numbers, and spaces.")
        return category

    def clean_price(self):
        """Validate and clean the product price.
        
        Validation rules:
        - Must be positive and greater than zero
        - Cannot exceed 1 billion
        - Rounded to 2 decimal places for consistent monetary values
        
        Returns:
            Decimal: The cleaned price value
        Raises:
            ValidationError: If validation fails
        """
        price = self.cleaned_data['price']
        if price <= 0:
            raise forms.ValidationError("Price must be greater than zero.")
        if price > 1000000000:
            raise forms.ValidationError("Price cannot exceed 1 billion.")
        return round(price, 2)  # Ensure 2 decimal places

    def clean_quantity(self):
        """Validate and clean the product quantity.
        
        Validation rules:
        - Must be non-negative (0 or greater)
        - Cannot exceed 1 million units for inventory management
        
        Returns:
            int: The cleaned quantity value
        Raises:
            ValidationError: If validation fails
        """
        quantity = self.cleaned_data['quantity']
        if quantity < 0:
            raise forms.ValidationError("Quantity cannot be negative.")
        if quantity > 1000000:
            raise forms.ValidationError("Quantity cannot exceed 1 million units.")
        return quantity

    def clean_color(self):
        """Validate and clean the optional color field.
        
        Validation rules:
        - If provided, must start with a letter
        - Can only contain letters and spaces
        - Automatically formatted to Title Case (e.g., 'dark blue' -> 'Dark Blue')
        - Empty values are allowed as the field is optional
        
        Returns:
            str: The cleaned color value, or None if not provided
        Raises:
            ValidationError: If validation fails
        """
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
        """Validate and clean the product image.
        
        Validation rules:
        - Required field - every product must have an image
        - Size limit: 5MB maximum to prevent server storage issues
        - Must be a valid image file (checks MIME type)
        - Allowed formats: JPEG, PNG, GIF
        - Performs both size and format validation to ensure quality
        
        Returns:
            InMemoryUploadedFile: The cleaned image file
        Raises:
            ValidationError: If validation fails
        """
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
        """Perform cross-field validations on the form data.
        
        Validation rules:
        - For bulk items (quantity > 100), enforces minimum price of 1000
          to ensure proper pricing for large quantity orders
        - Validates price-quantity relationships for business logic
        
        Returns:
            dict: The cleaned form data if all validations pass
        Raises:
            ValidationError: If cross-field validations fail
        """
        cleaned_data = super().clean()
        quantity = cleaned_data.get('quantity')
        price = cleaned_data.get('price')        # Cross-field validations
        if quantity is not None and price is not None:
            # For large quantities, ensure minimum price
            if quantity > 100 and price < 1000:
                raise forms.ValidationError("For large quantities (>100), the price should be at least 1000.")

        return cleaned_data