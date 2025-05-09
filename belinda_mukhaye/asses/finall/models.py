from django.db import models

# Create your models here.
class Product:
    name = models.CharField(max_length=20, blank=True, null=True)
    category = models.CharField(max_length=20, blank=True, null=True)
    price = models.IntegerField(default=0, blank=True, null=True)
    quantity = models.IntegerField( default=0, blank=True, null=True)
    def __str__(self):
        return self.name