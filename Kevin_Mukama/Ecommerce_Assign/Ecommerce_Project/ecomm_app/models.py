from django.db import models

# Create your models here.

class Product(models.Model):
    id_no = models.IntegerField(blank = True, null=True)
    name = models.CharField(max_length=80, blank = True)
    category = models.CharField(max_length=80, blank = True)
    price = models.IntegerField(blank = True)
    quantity = models.IntegerField(blank = True)
    color = models.CharField(max_length=20, blank = True)
    image = models.ImageField(upload_to='photos/', blank = True)

    def __str__(self):
        return self.name