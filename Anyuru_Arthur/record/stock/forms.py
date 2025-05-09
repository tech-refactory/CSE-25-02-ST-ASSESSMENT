from django.forms import ModelForm
from .models import *

class addStock(ModelForm):
    class Meta:
        model = product
        fields = '__all__'