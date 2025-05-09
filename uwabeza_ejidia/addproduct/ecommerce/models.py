from django.db import models
# Create your models here.

class AddProduct(models.Model):
    product_name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    color = models.CharField(max_length=50)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)  # Use ImageField for file uploads

    def __str__(self):
        return self.product_name

    @property
    def total_value(self):
        return self.price * self.quantity
