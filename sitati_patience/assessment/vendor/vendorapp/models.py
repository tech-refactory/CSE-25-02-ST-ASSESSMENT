from django.db import models

# Create your models here.
class Product(models.Model):
    product_name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    quantity = models.PositiveIntegerField()
    color = models.CharField(max_length=50)
    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return self.product_name
