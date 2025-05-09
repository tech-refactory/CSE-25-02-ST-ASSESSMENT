from django.db import models
from django.utils import timezone

# Create your models here.

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Smart Phones', 'Smart Phones'),
        ('Fashion', 'Fashion'),
        ('Interior Design', 'Interior Design'),
        ('Laptops', 'Laptops'),
        ('Electronics', 'Electronics')

    ]
    product_id = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=12, decimal_places=0)
    quantity = models.IntegerField(default=0)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
     

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.product_id:
            # Generate a product ID if not provided
            last_product = Product.objects.order_by('-id').first()
            if last_product:
                last_id = int(last_product.product_id.replace('#', ''))
                self.product_id = f"#{last_id + 1}"
            else:
                self.product_id = "#645340"
        if not self.product_id.startswith('#'):
            self.product_id = f'#{self.product_id}'
        super().save(*args, **kwargs)

class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Processing', 'Processing'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
    ]

    order_id = models.CharField(max_length=10, unique=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='orders')
    quantity = models.IntegerField(default=1)
    total_price = models.DecimalField(max_digits=12, decimal_places=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Order {self.order_id}"
    
    def save(self, *args, **kwargs):
        if not self.order_id:
            # Generate an order ID if not provided
            last_order = Order.objects.order_by('-id').first()
            if last_order:
                last_id = int(last_order.order_id.replace('#', ''))
                self.order_id = f"#{last_id + 1}"
            else:
                self.order_id = "#100001"
        if not self.total_price:
            self.total_price = self.product.price * self.quantity
        super().save(*args, **kwargs)

class Sale(models.Model):
    sale_id = models.CharField(max_length=10, unique=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='sales')
    quantity = models.IntegerField(default=1)
    total_price = models.DecimalField(max_digits=12, decimal_places=0)
    created_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"Sale {self.sale_id}"
    
    def save(self, *args, **kwargs):
        if not self.sale_id:
            # Generate a sale ID if not provided
            last_sale = Sale.objects.order_by('-id').first()
            if last_sale:
                last_id = int(last_sale.sale_id.replace('#', ''))
                self.sale_id = f"#{last_id + 1}"
            else:
                self.sale_id = "#200001"
        if not self.total_price:
            self.total_price = self.product.price * self.quantity
        super().save(*args, **kwargs)

    
    
      