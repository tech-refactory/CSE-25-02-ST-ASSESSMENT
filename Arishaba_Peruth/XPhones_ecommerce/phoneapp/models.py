from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255, blank=False)
    category = models.CharField(max_length=255, blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(blank=False)
    color = models.CharField(max_length=100, blank=False)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)

    def __str__(self):
        return self.name
