# Product Model: Defines the structure for storing product information in the database
from django.db import models
import uuid

class Product(models.Model):
    # Unique identifier for each product
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Basic product details
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    color = models.CharField(max_length=100)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)

    def str(self):
        return self.name