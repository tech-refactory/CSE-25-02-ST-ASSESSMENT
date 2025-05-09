from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255, blank=False)
    category = models.CharField(max_length=100, blank=False)
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    color = models.CharField(max_length=50, blank=False)
    image = models.ImageField(upload_to='products/', blank=True, null=False)

    def _str_(self):
        return self.name