from django.db import models

# Create your models here.
class Product(models.Model):
    CATEGORY_CHOICES = [
        'Smart Phones', 'Smart Phones',
        'Fashion', 'Fashion',
        'Interior Design', 'Interior Design',
        'Laptops', 'Laptops',
    ]

    product_name = models.CharField(max_length=100, verbose_name="Product Name", blank=False, null=False)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, verbose_name="Category", blank=False, null=False)
    price = models.IntegerField(max_digits=10,  verbose_name="Price", blank=False, null=False, default=0)
    quantity = models.IntegerField(verbose_name="Quantity", blank=False, null=False, default=0)
    color = models.CharField(max_length=100, verbose_name="Color", blank=False, null=False)
    image = models.ImageField(verbose_name="Upload Image", blank=False, null=False)

    def __str__(self):
        return self.product_name