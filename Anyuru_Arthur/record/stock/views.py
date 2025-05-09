from django.shortcuts import render
from .models import *
from .forms import *
# Create your views here.

def homePage(request):

    return render(request, 'index.html')

