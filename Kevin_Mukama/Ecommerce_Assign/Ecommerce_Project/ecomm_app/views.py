from django.shortcuts import render

# Create your views here.
def addproductView(request):
    return render(request, 'mainpage.html')