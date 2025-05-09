from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Row, Column, Div, HTML
from crispy_forms.bootstrap import StrictButton
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['product_id', 'name', 'category', 'price', 'quantity', 'color', 'image']
        widgets = {
            'product_id': forms.TextInput(attrs={'placeholder': 'Product ID'}),
            'name': forms.TextInput(attrs={'placeholder': 'Product Name'}),
            'price': forms.NumberInput(attrs={'placeholder': 'Price (UGX)'}),
            'quantity': forms.NumberInput(attrs={'placeholder': 'Quantity'}),
            'color': forms.TextInput(attrs={'placeholder': 'Color'}),
        }
        labels = {
            'product_id': 'ID',
            'name': 'Product Name',
            'price': 'Price (UGX)',
            'image': 'Upload Image',
        }
    
    def _init_(self, *args, **kwargs):
        super()._init_(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'POST'
        self.helper.form_class = 'form-horizontal'
        self.helper.label_class = 'col-lg-2'
        self.helper.field_class = 'col-lg-8'
        self.helper.form_tag = True
        self.helper.layout = Layout(
            HTML('<h4 class="mb-4">Add Product</h4>'),
            Row(
                Column('product_id', css_class='form-group col-md-6'),
                Column('name', css_class='form-group col-md-6'),
                css_class='form-row'
            ),
            Row(
                Column('category', css_class='form-group col-md-6'),
                Column('price', css_class='form-group col-md-6'),
                css_class='form-row'
            ),
            Row(
                Column('quantity', css_class='form-group col-md-6'),
                Column('color', css_class='form-group col-md-6'),
                css_class='form-row'
            ),
            Row(
                Column('image', css_class='form-group col-md-12'),
                css_class='form-row'
            ),
            Div(
                Submit('submit', 'SAVE', css_class='btn btn-primary px-4'),
                HTML('<button type="reset" class="btn btn-secondary px-4 ml-2">CLEAR</button>'),
                css_class='text-right mt-3'
            )
        )