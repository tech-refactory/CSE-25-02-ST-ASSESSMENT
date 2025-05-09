from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    price = models.PositiveIntegerField(help_text="Price in UGX")
    quantity = models.PositiveIntegerField()
    color = models.CharField(max_length=50, blank=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)

    def __str__(self):
        return self.name

