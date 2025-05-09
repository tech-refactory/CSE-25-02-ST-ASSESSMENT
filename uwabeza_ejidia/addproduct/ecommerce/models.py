
from django.db import models

class Product(models.Model):
    product_name = models.CharField(max_length=200,blank= False)
    category = models.CharField(max_length=100,blank= False)
    price = models.DecimalField(max_digits=12, decimal_places=2,blank= False)
    quantity = models.PositiveIntegerField(blank= True)
    color = models.CharField(max_length=50, blank=False)
    image = models.ImageField(upload_to='products/', blank=False, null=True)

    def __str__(self):
        return self.product_name

    @property
    def total_value(self):
        return self.price * self.quantity