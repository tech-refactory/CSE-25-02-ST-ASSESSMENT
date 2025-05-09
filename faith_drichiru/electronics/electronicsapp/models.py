from django.db import models
from django.utils import timezone
import uuid

class Product(models.Model):
    BASE_ID = 645341  # Changed to uppercase as it's a constant
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product_id = models.CharField(max_length=10, unique=True, editable=False, null=True)  # Removed default
    name = models.CharField(max_length=50, blank=False, null=False)   
    category = models.CharField(max_length=100, blank=False, null=False)
    price = models.PositiveIntegerField(blank=False, null=False)
    quantity = models.PositiveIntegerField(blank=False, null=False)
    color = models.CharField(max_length=50, blank=False, null=False)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.product_id:
            try:
                # Get the highest product_id and increment it
                last_product = Product.objects.all().order_by('-product_id').first()
                if last_product:
                    # Remove the '#' if it exists before converting to int
                    last_id = int(last_product.product_id.replace('#', ''))
                    self.product_id = f"#{last_id + 1}"
                else:
                    # If no products exist, start with BASE_ID
                    self.product_id = f"#{self.BASE_ID}"
            except (ValueError, TypeError):
                # If there's any error, fall back to BASE_ID
                self.product_id = f"#{self.BASE_ID}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product_id} - {self.name}"