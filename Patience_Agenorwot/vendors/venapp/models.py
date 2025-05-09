from django.db import models
import random

# Create your models here.
# creating a table called product
class Product(models.Model):
    custom_id = models.CharField(max_length=10, unique=True, blank=True)
    name = models.CharField(max_length=255, blank=False)
    category = models.CharField(max_length=255, blank=False)
    price = models.FloatField(max_length=100, blank=False)
    quantity = models.IntegerField(blank=False)
    color = models.CharField(max_length=50, blank=False)
    image = models.ImageField(upload_to='products/', blank=True)

    def save(self, *args, **kwargs):
        if not self.custom_id:
            # Generate a unique 5-digit numeric ID
            while True:
                new_id = f"#{random.randint(10000, 99999)}"
                if not Product.objects.filter(custom_id=new_id).exists():
                    self.custom_id = new_id
                    break
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

