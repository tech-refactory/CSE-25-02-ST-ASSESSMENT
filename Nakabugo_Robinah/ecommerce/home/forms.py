from django import forms

from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']
        
    def __init__(self, *args, **kwargs):
        super(ProductForm, self).__init__(*args, **kwargs)
        # Make all fields required
        for field_name, field in self.fields.items():
            field.required = True
            field.error_messages = {
                'required': 'This field is required',
                'invalid': 'Invalid field'
            }


            