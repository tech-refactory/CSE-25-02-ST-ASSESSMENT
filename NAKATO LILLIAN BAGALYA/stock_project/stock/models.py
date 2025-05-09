from django.db import models

# Create your models here.
class Product(models.Model):
    product_name = models.CharField(max_length=50, blank=False,null=False,unique=True,default="")
    category = models.CharField(max_length=50, blank=False,null=False)
    price =  models.FloatField(blank=False,null=False,default=0)
    quantity = models.IntegerField(blank=False,null=False,default=0)
    color = models.CharField(max_length=50,blank=False,null=False)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)


    def __str__(self):
        return self.product_name