from django.shortcuts import render

# Create your views here.

# A view for handling the e-commerce application.
def index(request):
    return render(request, 'index.html')  