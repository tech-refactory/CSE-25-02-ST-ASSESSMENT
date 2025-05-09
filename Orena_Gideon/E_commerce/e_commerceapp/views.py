from django.shortcuts import render

# Create your views here.

# A view for handling the e-commerce application.
def index(request):
    if request.method == 'POST':
        data = request.POST

        # Manually data from the post request
        
    return render(request, 'index.html')  