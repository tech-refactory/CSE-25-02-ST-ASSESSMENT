
from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity', 'color', 'image']
        widgets = {
            'image': forms.ClearableFileInput(attrs={
                'class': 'p-2 rounded w-full',
                'required': True
            }),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for name, field in self.fields.items():
            field.required = True  # Force required fields
            css_classes = 'p-2 rounded w-full '

            if self.is_bound:
                if self.errors.get(name):
                    css_classes += 'border border-red-500'
                else:
                    css_classes += 'border border-green-500'
            else:
                css_classes += 'border border-gray-300'

            field.widget.attrs.update({
                'class': css_classes,
                'required': 'required',
            })

    def clean(self):
        cleaned_data = super().clean()

        # Defensive: double-check all values are filled
        for name in self.fields:
            if not cleaned_data.get(name):
                self.add_error(name, "This field is required.")

        return cleaned_data
