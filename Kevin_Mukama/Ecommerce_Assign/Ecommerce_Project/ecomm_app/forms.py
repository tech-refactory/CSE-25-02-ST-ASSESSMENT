from django.forms import ModelForm
from .models import *

class AddProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price',]