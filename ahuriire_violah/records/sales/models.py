from django.db import models
from django.core.validators import RegexValidator, MinValueValidator
import random

# ✅ ID generator must come before model
def generate_product_id():
    return str(random.randint(100000, 999999))

class Product(models.Model):
    # Validators
    name_validator = RegexValidator(
        
        regex=r'^[\w\s+-]+$',
        message='Only letters, numbers, spaces, "+" and "-" are allowed.'




    )

    category_validator = RegexValidator(
        regex=r'^[A-Za-z\s]+$',
        message='Category must contain only letters and spaces.'
    )

    color_validator = RegexValidator(
        regex=r'^[A-Za-z\s]+$',
        message='Color must contain only letters and spaces.'
    )

    product_id = models.CharField(
        max_length=6,
        unique=True,
        editable=False,
        default=generate_product_id
    )
    name = models.CharField(max_length=255, validators=[name_validator])
    category = models.CharField(max_length=100, validators=[category_validator])
    price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0.01)],
        help_text='Must be a positive number greater than 0.'
    )
    quantity = models.PositiveIntegerField(
        validators=[MinValueValidator(1)],
        help_text='Must be a whole number greater than 0.'
    )
    color = models.CharField(max_length=50, validators=[color_validator])
    
    

    def __str__(self):
        return f"#{self.product_id} - {self.name}"
