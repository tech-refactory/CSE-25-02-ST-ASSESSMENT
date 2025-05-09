from django import forms
from .models import Product


class ProductForm(forms.ModelForm):
    name = forms.CharField(label='Product Name', widget=forms.TextInput(attrs={'placeholder': 'Product Name'}))
    category = forms.CharField(label='Category', widget=forms.TextInput(attrs={'placeholder': 'Category'}))
    price = forms.DecimalField(label='Price ', widget=forms.NumberInput(attrs={'placeholder': 'Price '}))
    quantity = forms.IntegerField(label='Quantity', widget=forms.NumberInput(attrs={'placeholder': 'Quantity'}))
    color = forms.CharField(label='Color', required=True, widget=forms.TextInput(attrs={'placeholder': 'Color'}))
    upload_image = forms.FileField(label='Upload Image', required=True, widget=forms.FileInput(attrs={'placeholder': 'Upload Image'}))

    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']
        # You can customize widgets, labels, etc., here if needed

    def clean_name(self):
        name = self.cleaned_data['name']
        if len(name) < 3:
            raise forms.ValidationError("Product name must be at least 3 characters long.")
        return name

    def clean_price(self):
        price = self.cleaned_data['price']
        if price <= 0:
            raise forms.ValidationError("Price must be a positive value.")
        return price

    def clean_quantity(self):
        quantity = self.cleaned_data['quantity']
        if quantity < 0:
            raise forms.ValidationError("Quantity cannot be negative.")
        return quantity

    def clean(self):
        cleaned_data = super().clean()
        quantity = cleaned_data.get('quantity')
        price = cleaned_data.get('price')

        if quantity is not None and price is not None and quantity > 100 and price < 1000:
            raise forms.ValidationError("For large quantities, the price should be at least 1000.")
        return cleaned_data