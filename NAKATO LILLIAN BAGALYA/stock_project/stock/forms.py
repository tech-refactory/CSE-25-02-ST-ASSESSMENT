from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['product_name', 'category', 'price', 'quantity', 'color', 'image']
    
    def clean_image(self):
        image = self.cleaned_data.get('image')
        if not image:
            return None 
        return image