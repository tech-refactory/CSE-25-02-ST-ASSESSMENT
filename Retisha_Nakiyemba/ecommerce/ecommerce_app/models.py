from django.db import models
# Create your models here.
# model for Product


class Product(models.Model):
    #product_id=models.UUIDField(primary_key=True,default =uuid.uuid4,editable=False)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    color = models.CharField(max_length=100)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)

    def _str_(self):
        return self.name
