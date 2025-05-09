from django.db import models

import random
# Create your models here.

def generate_product_id():
    return str(random.randint(100000, 999999))

class Product(models.Model):
    product_id = models.CharField(max_length=6, unique=True, editable=False, default=generate_product_id)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    price = models.PositiveIntegerField(help_text="Price in UGX")
    quantity = models.PositiveIntegerField()
    color = models.CharField(max_length=30, blank=True, null=True)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)

    def __str__(self):
        return f"#{self.product_id} - {self.name}"

    def save(self, *args, **kwargs):
        if not self.product_id:
            while True:
                new_id = generate_product_id()
                if not Product.objects.filter(product_id=new_id).exists():
                    self.product_id = new_id
                    break
        super().save(*args, **kwargs)
