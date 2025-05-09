from django.shortcuts import render
from .models import *
from django.contrib import messages
from django.contrib.humanize.templatetags.humanize import intcomma

# Create your views here.
def index(request):
    product = Product.objects.all()
    
    return render(request, 'index.html')