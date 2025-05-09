from django.db import models

# Product model
class Product(models.Model):
    name = models.CharField(max_length=255, default='Unnamed Product')  
    category = models.CharField(max_length=100, default='General')       
    price = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)  
    quantity = models.PositiveIntegerField(default=0)                    
    color = models.CharField(max_length=50, blank=True, null=True)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    sold_at = models.DateField(auto_now=True)

    def __str__(self):
        return self.name



class Sale(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity_sold = models.PositiveIntegerField(default=1)  
    date = models.DateTimeField(auto_now_add=True)

    def get_total_price(self):
        return self.product.price * self.quantity_sold

    def __str__(self):
        return f"{self.product.name} - {self.quantity_sold} sold"
