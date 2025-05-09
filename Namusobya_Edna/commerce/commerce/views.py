from django.shortcuts import render
from django.contrib.auth.decorators import login_required

def dashboard(request):
    return render(request, 'dashboard.html')

@login_required
def vendor_dashboard(request):
    return render(request, 'vendor/dashboard_review.html') 