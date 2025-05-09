from django.db import models
from django.core.validators import MinValueValidator, RegexValidator

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Smart Phones', 'Smart Phones'),
        ('Fashion', 'Fashion'),
        ('Interior Design', 'Interior Design'),
        ('Laptops', 'Laptops'),
    ]
    
    # Validators
    alphanumeric = RegexValidator(
        r'^[0-9a-zA-Z\s\+]+$', 
        'Only alphanumeric characters, spaces and + are allowed.'
    )
    
    # Fields
    product_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, validators=[alphanumeric])
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    price = models.IntegerField(validators=[MinValueValidator(1)])
    quantity = models.IntegerField(validators=[MinValueValidator(0)])
    color = models.CharField(max_length=50, blank=True, null=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    
    
    def _str_(self):
        return f"{self.name} ({self.product_id})"
    
    @property
    def is_in_stock(self):
        return self.quantity > 0
    
    @property
    def stock_status(self):
        if self.quantity > 0:
            return f"{self.quantity} In stock"
        else:
            return f"{self.quantity} Out of stock"