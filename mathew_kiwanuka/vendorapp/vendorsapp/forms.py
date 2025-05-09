from .models import Product
from django import forms
from django.forms import ModelForm


class ProductForm(ModelForm):
    class Meta:
        model = Product

        fields = "__all__"

    def clean_name(self):
        name = self.cleaned_data.get('name')

        if len(name) < 2:
            raise forms.ValidationError("Please use more letters.")
        
        for part in name:
            if not part.isalpha():
                raise forms.ValidationError("Names must only contain letters.")
            if not part[0].isupper():
                raise forms.ValidationError("Each name must start with a capital letter.")
            
            if not part[1:].islower():
                raise forms.ValidationError("All letters after the first must be lowercase")

    
    def clean_category(self):
        category = self.cleaned_data.get('category')

        if len(category) < 2:
            raise forms.ValidationError("Please use more letters.")
        
        for part in category:
            if not part.isalpha():
                raise forms.ValidationError("Category must only contain letters.")
            if not part[0].isupper():
                raise forms.ValidationError("Each name must start with a capital letter.")
            
            if not part[1:].islower():
                raise forms.ValidationError("All letters after the first must be lowercase")
        
        