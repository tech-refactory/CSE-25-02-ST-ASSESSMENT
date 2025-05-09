from django.db import models

# Create your models here.
class Product(models.Model):
    name =  models.CharField(max_length=10, blank=True, null=True)
    category = models.CharField(max_length=10, blank=True, null=True)
    price = models.IntegerField(default=0, blank=True, null=True)
    quantity = models.IntegerField(default=0, blank=True, null=True)
