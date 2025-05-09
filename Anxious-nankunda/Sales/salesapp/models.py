from django.db import models

# Create your models here.
# models.py
class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    quantity = models.PositiveIntegerField()
    color = models.CharField(max_length=50, blank=True, null=True)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    sold_at = models.DateField(auto_now=True)
class Sale(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity_sold = models.PositiveIntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def get_total_price(self):
        return self.product.price * self.quantity_sold