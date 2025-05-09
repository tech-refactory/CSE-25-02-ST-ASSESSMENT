from django import forms
from .models import Product
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Row, Column

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']

    def _init_(self, *args, **kwargs):
        super(ProductForm, self)._init_(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            Row(
                Column('name', css_class='form-group col-md-6 mb-0'),
                Column('category', css_class='form-group col-md-6 mb-0'),
            ),
            Row(
                Column('price', css_class='form-group col-md-4 mb-0'),
                Column('quantity', css_class='form-group col-md-4 mb-0'),
                Column('color', css_class='form-group col-md-4 mb-0'),
            ),
            'image',
            Row(
                Submit('submit', 'SAVE', css_class='btn btn-warning'),
                Submit('clear', 'CLEAR', css_class='btn btn-light'),
            )
        )