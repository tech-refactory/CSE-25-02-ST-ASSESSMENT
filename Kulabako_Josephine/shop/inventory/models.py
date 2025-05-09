
# Create your models here.
from django.db import models

class Product(models.Model):
    product_name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    quantity = models.PositiveIntegerField()
    image = models.FileField(upload_to='product_images/', null=True, blank=True)

    def __str__(self):
        return self.product_name
    



