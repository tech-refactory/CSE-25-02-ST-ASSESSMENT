from django.db import models

# Create your models here.

# Model for an E-commerce application.
class Product(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    category = models.CharField(max_length=255, null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True)
    color = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to='static/media/', null=True, blank=True)


    # Calling the model by its name.
    def __str__(self):
        return self.name


