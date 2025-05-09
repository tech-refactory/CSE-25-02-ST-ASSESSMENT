from django.contrib import admin
from .models import Product
from django.utils.html import format_html

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'price', 'quantity', 'color', 'image_preview')
    search_fields = ('name', 'category')
    list_filter = ('category',)
    ordering = ('-id',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover;" />', obj.image.url)
        return "-"
    image_preview.short_description = 'Image'

admin.site.register(Product, ProductAdmin)




