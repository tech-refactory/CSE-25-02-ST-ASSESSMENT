document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.product-form form');
    const inputs = form.querySelectorAll('input[required]');
    const submitBtn = form.querySelector('.save-btn');
    const clearBtn = form.querySelector('.clear-btn');
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box hidden';
    form.prepend(alertBox);

    function setValidationStyles(element, isValid) {
        if (isValid) {
            element.style.borderColor = '#4CAF50';
            element.nextElementSibling.style.display = 'none';
        } else {
            element.style.borderColor = '#f44336';
            element.nextElementSibling.style.display = 'block';
        }
    }

    function validateField(field) {
        if (field.type === 'file') {
            return field.files.length > 0;
        }
        return field.value.trim() !== '';
    }

    function validateForm() {
        let isValid = true;
        inputs.forEach(input => {
            const fieldValid = validateField(input);
            setValidationStyles(input, fieldValid);
            if (!fieldValid) isValid = false;
        });
        return isValid;
    }

    function showAlert(message, isSuccess) {
        alertBox.textContent = message;
        alertBox.className = isSuccess ? 'alert-box success' : 'alert-box error';
        alertBox.style.display = 'block';
        
        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 5000);
    }

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            setValidationStyles(this, validateField(this));
        });

        input.addEventListener('blur', function() {
            setValidationStyles(this, validateField(this));
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            showAlert('Product added successfully!', true);
            form.reset();
            
            inputs.forEach(input => {
                input.style.borderColor = '';
            });
        } else {
            showAlert('Please fill all required fields correctly!', false);
        }
    });

    clearBtn.addEventListener('click', function() {
        form.reset();
        showAlert('Form cleared successfully!', true);
        
        inputs.forEach(input => {
            input.style.borderColor = '';
            input.nextElementSibling.style.display = 'none';
        });
    });
});