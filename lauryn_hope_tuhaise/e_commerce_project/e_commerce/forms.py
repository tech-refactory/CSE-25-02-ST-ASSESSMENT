from django.forms import ModelForm
from django import forms
from .models import *

class Product(ModelForm):
    class Meta:

        model = Product
        fields='__all__'