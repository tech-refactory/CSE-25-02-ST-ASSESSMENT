# models.py
from django.db import models

CATEGORY_CHOICES = [
    ('Laptops', 'Laptops'),
    ('Fashion', 'Fashion'),
    ('Smart phones', 'Smart phones'),
    ('Interior Design', 'Interior Design'),
]



class Product(models.Model):
    product_name = models.CharField(max_length=100, blank=True, null=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(blank=True, null=True)
    color = models.CharField(max_length=100, blank=True, null=True)
    upload_image = models.ImageField(upload_to='images/', blank=True, null=True)

    def __str__(self):
        return self.product_name

