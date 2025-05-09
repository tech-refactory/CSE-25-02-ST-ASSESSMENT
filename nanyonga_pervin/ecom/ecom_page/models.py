from django.db import models

# Create your models here.
class Product(models.Model):
    

    product_name = models.CharField(max_length=100, verbose_name="Product Name", blank=False, null=False)
    category = models.CharField(max_length=100, verbose_name="Category", blank=False, null=False)
    price = models.IntegerField( verbose_name="Price", blank=False, null=False, )
    quantity = models.IntegerField(verbose_name="Quantity", blank=False, null=False, )
    color = models.CharField(max_length=100, verbose_name="Color", blank=False, null=False)
    image = models.CharField(verbose_name="Upload Image", blank=False, null=False)

    def total_sales(self):
        if self.price and self.quantity:
            return self.price * self.quantity
        return 0

    def __str__(self):
        return self.product_name