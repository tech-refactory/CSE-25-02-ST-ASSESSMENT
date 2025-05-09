from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255, blank=False, null=True)
    category = models.CharField(max_length=255, blank=False, null=True)
    price = models.PositiveIntegerField(help_text="Price in UGX")
    quantity = models.PositiveIntegerField(max_length=10, help_text="Quantity in stock", blank=False, null=True)
    color = models.CharField(max_length=50, blank=True)
    image = models.ImageField(upload_to='products/', blank=False, null=True)

    def __str__(self):
        return self.name