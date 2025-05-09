from .models import Product
from django import forms



class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['product_name', 'category', 'price', 'quantity', 'color', 'image']
        widgets = {
            'product_name': forms.TextInput(attrs={'placeholder': 'Enter product name'}),
            'category': forms.TextInput(attrs={'placeholder': 'Category'}),
            'price': forms.NumberInput(attrs={'placeholder': 'Price'}),
            'quantity': forms.NumberInput(attrs={'placeholder': 'Quantity'}),
            'color': forms.TextInput(attrs={'placeholder': 'Color'}),
            'image': forms.TextInput(attrs={'placeholder': 'Upload Image'}),  # no placeholder for file inputs
        }
    def clean_price(self):
        price = self.cleaned_data.get('price')

        if not price:
            raise forms.ValidationError("Invalid Field")
    
        if price <= 0:
            raise forms.ValidationError("Invalid Field")
    
        

        return price


    def clean_quantity(self):
        quantity = self.cleaned_data.get('quantity')

        if not quantity:
            raise forms.ValidationError("Invalid Field")
    
        if quantity <= 0:
            raise forms.ValidationError("Invalid Field")
    
        
        return quantity

    def clean_product_name(self):
        product_name = self.cleaned_data.get('product_name')
        if not product_name:
            raise forms.ValidationError("Invalid Field")
    
        if len(product_name) < 3:
            raise forms.ValidationError("Invalid Field")
    
        if product_name.isdigit():
            raise forms.ValidationError("Invalid Field")


        return product_name


    def clean_category(self):
        category = self.cleaned_data.get('category')

        if not category:
            raise forms.ValidationError("Invalid Field")
        
        if category.isdigit():
            raise forms.ValidationError("Invalid Field")

        
        return category


    def clean_image(self):
        image = self.cleaned_data.get('image')

        if not image:
            raise forms.ValidationError("Invalid Field")
        
        return image

    def clean_color(self):
        color = self.cleaned_data.get('color')

        if not color:
            raise forms.ValidationError("Invalid Field")
        
        return color


