from django import forms
from . models import*


from .models import Sale

class SaleForm(forms.ModelForm):
    class Meta:
        model = Sale
        fields = ['product','quantity_sold']

        widgets = {
            'product': forms.TextInput(attrs={'class': 'form-control'}),
            'category': forms.TextInput(attrs={'class': 'form-control'}),
            'price': forms.Select(attrs={'class': 'form-control'}),
            'quantity_sold': forms.Select(attrs={'class': 'form-control'}),
            'color': forms.Select(attrs={'class': 'form-control'}),
            'image': forms.Select(attrs={'class': 'form-control'}),
            
        }
        
        error_messages = {
            'product': {'required': 'Invalid field'},
            'category': {'required': 'Invalid field'},
            'price': {'required': 'Invalid field'},
            'quantity_sold': {'required': 'Invalid field'},
            'color': {'required': 'Invalid field'},
            'image': {'required': 'Invalid field'},
          
        }
    


    def clean_quantity_sold(self):
        qty = self.cleaned_data['quantity_sold']
        product = self.cleaned_data.get('product')
        if product and qty > product.quantity:
            
         return qty