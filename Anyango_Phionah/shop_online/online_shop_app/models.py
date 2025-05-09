from django.db import models

# Create your models here.
#creating models for the class products 
class Product(models.Model):
    product_name = models.CharField(max_length=25,default=0,blank =False)
    price = models.FloatField(blank=False,null=False,default=0)
    quantity = models.CharField(blank=False,null=False,default=0)
    category =models.CharField(balnk=False,null=False,default=0)
    colour = models.CharField(blank=False,default=0, null=False)

    
    def __str__(self):
        return self.product_name


