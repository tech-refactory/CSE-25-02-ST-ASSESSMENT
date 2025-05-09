document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.product-form form');
    const inputs = form.querySelectorAll('input[required]');
    const submitBtn = form.querySelector('.save-btn');
    const clearBtn = form.querySelector('.clear-btn');
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box hidden';
    form.prepend(alertBox);

    // Function to set the validation styles (green for valid, red for invalid)
    function setValidationStyles(element, isValid) {
        if (isValid) {
            element.style.borderColor = '#4CAF50'; // Green for valid
            if (element.nextElementSibling && element.nextElementSibling.classList.contains('invalid field')) {
                element.nextElementSibling.style.display = 'none'; // Hide error message
            }
        } else {
            element.style.borderColor = '#f44336'; // Red for invalid
            if (element.nextElementSibling && element.nextElementSibling.classList.contains('invalid field')) {
                element.nextElementSibling.style.display = 'block'; // Show error message
            }
        }
    }

    // Function to validate individual fields
    function validateField(field) {
        if (field.type === 'file') {
            return field.files.length > 0; // For file input, ensure a file is selected
        }
        return field.value.trim() !== ''; // For other fields, ensure they are not empty
    }

    // Function to validate the entire form
    function validateForm() {
        let isValid = true;
        inputs.forEach(input => {
            const fieldValid = validateField(input);
            setValidationStyles(input, fieldValid); // Apply validation styles
            if (!fieldValid) isValid = false;
        });
        return isValid;
    }

    // Function to show alert messages
    function showAlert(message, isSuccess) {
        alertBox.textContent = message;
        alertBox.className = isSuccess ? 'alert-box success' : 'alert-box error';
        alertBox.style.display = 'block';

        // Hide the alert after 5 seconds
        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 5000);
    }

    // Event listener for input fields to apply validation while typing
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            setValidationStyles(this, validateField(this));
        });

        input.addEventListener('blur', function() {
            setValidationStyles(this, validateField(this));
        });
    });

    // Event listener for form submit
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission

        if (validateForm()) {
            showAlert('Product added successfully!', true); // Show success message
            form.reset(); // Reset form to default state
            inputs.forEach(input => {
                input.style.borderColor = ''; // Reset border color
                if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                    input.nextElementSibling.style.display = 'none'; // Hide error message
                }
            });
        } else {
            showAlert('Please fill all required fields correctly!', false); // Show error message
        }
    });

    // Event listener for clear button to reset form
    clearBtn.addEventListener('click', function() {
        form.reset(); // Reset the form

        // Reset all fields to their default state without red borders
        inputs.forEach(input => {
            input.style.borderColor = ''; // Reset all borders to default (no color)
            if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                input.nextElementSibling.style.display = 'none'; // Hide error message
            }
        });

        showAlert('Form cleared successfully!', true); // Show success message for clearing
    });
});
