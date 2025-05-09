from django.db import models

# Create your models here.

class Product(models.Model):   
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    color = models.CharField(max_length=50)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
