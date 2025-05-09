from django import forms
from. models import Product


class ProductForm(forms.modelsForm):
      class Meta:
         model = Product
         fields = "_all_"