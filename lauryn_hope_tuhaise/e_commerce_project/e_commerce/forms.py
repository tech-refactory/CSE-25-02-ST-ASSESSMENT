from django.forms import ModelForm
from django import forms
from .models import *
from django.core.validators import RegexValidator, MinValueValidator

class ProductForm(ModelForm):
    product_name = forms.CharField(
        max_length=50,
        required=True,
        validators=[
            RegexValidator(
                regex=r'^[A-Za-z0-9\s\-&]{3,50}$',
                message='Invalid Field'
            )
        ],
        widget=forms.TextInput(attrs={
            'placeholder': 'Product Name',
            'class': 'form-control'
        })
    )
    
    category = forms.CharField(
        max_length=100,
        required=True,
        validators=[
            RegexValidator(
                regex=r'^[A-Za-z\s]{3,100}$',
                message='Invalid Field'
            )
        ],
        widget=forms.TextInput(attrs={
            'placeholder': 'Category',
            'class': 'form-control'
        })
    )
    
    price = forms.IntegerField(
        required=True,
        validators=[
            MinValueValidator(1000, message='Invalid Field')
        ],
        widget=forms.NumberInput(attrs={
            'placeholder': 'Price',
            'class': 'form-control',
            'min': '1000'
        })
    )
    
    quantity = forms.IntegerField(
        required=True,
        validators=[
            MinValueValidator(0, message='Invalid Field.')
        ],
        widget=forms.NumberInput(attrs={
            'placeholder': 'Quantity',
            'class': 'form-control',
            'min': '0'
        })
    )
    
    color = forms.CharField(
        max_length=50,
        required=True,
        validators=[
            RegexValidator(
                regex=r'^[A-Za-z\s\-]{3,50}$',
                message='Invallid Field'
            )
        ],
        widget=forms.TextInput(attrs={
            'placeholder': 'Color',
            'class': 'form-control'
        })
    )
    
    image = forms.ImageField(
        required=True,
        widget=forms.FileInput(attrs={
            'class': 'form-control',
            'accept': 'image/*'
        })
    )
    class Meta:

        model = Product
        fields='__all__'

    def clean(self):
    
        cleaned_data = super().clean()
        return cleaned_data

class ProductsForm(ModelForm):
    class Meta:
        model = Product
        fields= '__all__'
        widgets = {
            'product_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Product Name'}),
            'category': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Category'}),
            'price': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Price'}),
            'quantity': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Quantity'}),
            'color': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Color'}),
            'image': forms.ClearableFileInput(attrs={'class': 'form-control'}),
        }
        error_messages = {
            'name': {'required': 'Invalid field'},
            'category': {'required': 'Invalid field'},
            'price': {'required': 'Invalid field'},
            'quantity': {'required': 'Invalid field '},
            'color': {'required': 'Invalid field'},
            'Image': {'required': 'Invalid field'},
        }