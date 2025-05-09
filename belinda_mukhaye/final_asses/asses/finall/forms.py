from django.forms import ModelForm

#accessing our model file to create corresponding forms
from .models import *

class AddProductForm(ModelForm):
    class Meta:
        model = Product
    
        fields = '__all__'
        