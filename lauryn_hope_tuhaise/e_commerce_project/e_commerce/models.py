from django.db import models
from django.utils import timezone
import uuid

# Create your models here.

class Product(models.Model):
    base_id = 645341
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product_id = models.CharField(max_length=10, unique=True, editable=False)
    product_name=models.CharField(max_length=50, blank=False, null=False)   
    category = models.CharField(max_length=100, blank=False, null=False)
    price = models.PositiveIntegerField( blank=False, null=False)
    quantity = models.PositiveIntegerField(blank=False, null=False)
    color = models.CharField(max_length=50, blank=False, null=False)
    image = models.ImageField(upload_to='products/', blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.product_id:
            last = Product.objects.order_by('-product_id').first()
            if not last:
                new_id = str(self.base_id + 1)
            else:
                new_id = str(int(last.product_id) + 1)
            self.product_id = new_id
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product_id} - {self.product_name}" 