from django.db import models
from django import forms

# Create your models here.

class Product(models.Model):
   name = models.CharField(max_length=255, blank=False)
   category = models.CharField(max_length=100)
   price = models.PositiveIntegerField( blank=False)
   Quantity = models.PositiveIntegerField(blank=False)
   color = models.CharField(max_length=50)
   image = models.FileField(upload_to='products/', blank=True, null=True)
   





