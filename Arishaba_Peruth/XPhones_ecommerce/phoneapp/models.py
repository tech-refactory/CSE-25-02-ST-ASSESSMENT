from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=100, blank=False)
    Category = models.CharField(max_length=100, blank=False)
    Price = models.IntegerField(blank=False)
    Quantity = models.IntegerField(blank=False)
    color = models.CharField(max_length=100, blank=False)
    image = models.ImageField(upload_to='product_images/', blank=False)

    def __str__(self):
        return self.name


