from django.db import models
import random
import uuid

# Create your models here.

class Product(models.Model): 
      
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    color = models.CharField(max_length=50)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    

    def __str__(self):
        return self.name
