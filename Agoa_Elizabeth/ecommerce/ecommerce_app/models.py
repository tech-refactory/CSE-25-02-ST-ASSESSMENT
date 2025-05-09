from django.db import models
from django import forms

# Create your models here.

class Product(models.Model):
   name = models.CharField(max_length=255)
   category = models.CharField(max_length=100)
   price = models.PositiveIntegerField(max_length=100)
   Quantity = models.IntegerField(max_length=100)
   color = models.CharField(max_length=50)
   image = models.ImageField(upload_to='products/', blank=True, null=True)


def __str__(self):
        return self.name