from django.db import models
from django.utils import timezone
import uuid

# Create your models here.

class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    display_id = models.CharField(max_length=10, unique=True, editable=False)
    product_name=models.CharField(max_length=50, blank=False, null=False)   
    category = models.CharField(max_length=100, blank=False, null=False)
    price = models.PositiveIntegerField( blanck=False, null=False)
    quantity = models.PositiveIntegerField(blank=False, null=False)
    color = models.CharField(max_length=50, blank=False, null=False)
    image = models.ImageField(upload_to='products/', blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.display_id:
            # Generate a display ID like #645341
            last_product = Product.objects.order_by('-created_at').first()
            if last_product and last_product.display_id.startswith('#'):
                try:
                    last_id = int(last_product.display_id[1:])
                    self.display_id = f"#{last_id + 1}"
                except ValueError:
                    self.display_id = f"#{645341}"
            else:
                self.display_id = f"#{645341}"
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.display_id} - {self.name}"