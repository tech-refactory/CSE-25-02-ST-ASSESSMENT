from django.db import models

# Create your models here.
class product(models.Model):
    name = models.CharField(blank=False, null=True)
    category = models.CharField(choices=[('Smart Phones', 'Smart Phones'), ('Fashion', 'Fashion'), ('Interior Design', 'Interior Design'), ('Laptops', 'Laptops')],blank=False, null=True)
    price = models.IntegerField(blank=False, null=True)
    quantity = models.IntegerField(blank=False, null=True)
