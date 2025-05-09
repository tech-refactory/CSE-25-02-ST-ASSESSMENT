from django.forms.widgets import TextInput, NumberInput, FileInput
from django.utils.html import format_html

class ValidatedTextInput(TextInput):

    
    def __init__(self, attrs=None):
        default_attrs = {'class': 'form-control'}
        if attrs:
            default_attrs.update(attrs)
        super().__init__(default_attrs)
    
    def render(self, name, value, attrs=None, renderer=None):
    
        has_error = False
        if attrs and 'class' in attrs and 'is-invalid' in attrs['class']:
            has_error = True
        
        
        widget_html = super().render(name, value, attrs, renderer)
        
       
        if value and not has_error:
            valid_icon = format_html(
                '<span class="validation-icon valid-icon">✓</span>'
            )
            widget_html = format_html('{}<div class="icon-container">{}</div>', widget_html, valid_icon)
        elif has_error:
            invalid_icon = format_html(
                '<span class="validation-icon invalid-icon">✕</span>'
            )
            widget_html = format_html('{}<div class="icon-container">{}</div>', widget_html, invalid_icon)
        
        return widget_html

class ValidatedNumberInput(NumberInput):
  
    
    def __init__(self, attrs=None):
        default_attrs = {'class': 'form-control'}
        if attrs:
            default_attrs.update(attrs)
        super().__init__(default_attrs)
    
    def render(self, name, value, attrs=None, renderer=None):
        
        has_error = False
        if attrs and 'class' in attrs and 'is-invalid' in attrs['class']:
            has_error = True
        
        widget_html = super().render(name, value, attrs, renderer)
        
        if value and not has_error:
            valid_icon = format_html(
                '<span class="validation-icon valid-icon">✓</span>'
            )
            widget_html = format_html('{}<div class="icon-container">{}</div>', widget_html, valid_icon)
        elif has_error:
            invalid_icon = format_html(
                '<span class="validation-icon invalid-icon">✕</span>'
            )
            widget_html = format_html('{}<div class="icon-container">{}</div>', widget_html, invalid_icon)
        
        return widget_html

class ValidatedFileInput(FileInput):
   
    
    def __init__(self, attrs=None):
        default_attrs = {'class': 'form-control'}
        if attrs:
            default_attrs.update(attrs)
        super().__init__(default_attrs)
    
    def render(self, name, value, attrs=None, renderer=None):
        
        has_error = False
        if attrs and 'class' in attrs and 'is-invalid' in attrs['class']:
            has_error = True
        
        widget_html = super().render(name, value, attrs, renderer)
        
        if value and not has_error:
            valid_icon = format_html(
                '<span class="validation-icon valid-icon">✓</span>'
            )
            widget_html = format_html('{}<div class="icon-container">{}</div>', widget_html, valid_icon)
        elif has_error:
            invalid_icon = format_html(
                '<span class="validation-icon invalid-icon">✕</span>'
            )
            widget_html = format_html('{}<div class="icon-container">{}</div>', widget_html, invalid_icon)
        
        return widget_html