
        document.addEventListener('DOMContentLoaded', function() {
            const saveButton = document.getElementById('save-button');
            const productNameInput = document.getElementById('product-name');
            const categoryInput = document.getElementById('category');
            const priceInput = document.getElementById('price');
            const quantityInput = document.getElementById('quantity');
            const colorInput = document.getElementById('color');
            const sizeInput = document.getElementById('size');

            const inputFields = [
                { input: productNameInput, error: document.getElementById('product-name-error') },
                { input: categoryInput, error: document.getElementById('category-error') },
                { input: priceInput, error: document.getElementById('price-error') },
                { input: quantityInput, error: document.getElementById('quantity-error') },
                { input: colorInput, error: document.getElementById('color-error') },
                { input: sizeInput, error: document.getElementById('size-error') },
            ];

            // Function to clear error/valid states
            function clearInputState(inputElement, errorElement) {
                inputElement.classList.remove('error-input', 'valid-input');
                errorElement.classList.remove('active');
                errorElement.textContent = '';
            }

            // Add event listeners to each input field for real-time validation
            inputFields.forEach(({ input, error }) => {
                input.addEventListener('input', () => {
                    if (input.value.trim() !== '') {
                        input.classList.remove('error-input');
                        input.classList.add('valid-input');
                        error.classList.remove('active');
                        error.textContent = '';
                    } else if (input.classList.contains('valid-input')) {
                        input.classList.remove('valid-input');
                    }
                });
            });

            saveButton.addEventListener('click', function() {
                let isValid = true;

                // Reset all input states
                inputFields.forEach(({ input, error }) => clearInputState(input, error));

                // Validate required fields
                inputFields.forEach(({ input, error }) => {
                    if (input.value.trim() === '') {
                        input.classList.add('error-input');
                        error.textContent = 'Invalid Field';
                        error.classList.add('active');
                        isValid = false;
                    } else {
                        input.classList.add('valid-input'); // Mark as valid on save if not empty
                    }
                });

                if (!isValid) {
                    console.log('Form has errors. Please correct the invalid fields.');
                } else {
                    console.log('Form is valid. Ready to save data.');
                    // Proceed with form submission or data saving
                }
            });

            const clearButton = document.getElementById('clear-button');
            clearButton.addEventListener('click', function() {
                inputFields.forEach(({ input, error }) => {
                    input.value = '';
                    clearInputState(input, error);
                });
            });
        });
