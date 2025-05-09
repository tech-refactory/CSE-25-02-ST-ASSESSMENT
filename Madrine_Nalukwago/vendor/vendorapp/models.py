from django.db import models

class Product(models.Model):    
    product_name = models.Charfield(max_length=100)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(blank=True, null=True)
    color = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/')


    def __str__(self):
        return self.product_name
