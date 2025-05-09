document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productTable = document.getElementById('productTable');
    let productId = 1;

    // Validation functions
    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch(input.name) {
            case 'name':
                isValid = value.length >= 3 && value.length <= 50;
                errorMessage = 'Product name must be between 3 and 50 characters';
                break;
            case 'category':
                isValid = value.length >= 2;
                errorMessage = 'Category is required';
                break;
            case 'price':
                isValid = !isNaN(value) && Number(value) > 0;
                errorMessage = 'Price must be greater than 0';
                break;
            case 'quantity':
                isValid = !isNaN(value) && Number(value) >= 0;
                errorMessage = 'Quantity must be 0 or greater';
                break;
        }

        toggleError(input, isValid, errorMessage);
        return isValid;
    }

    function toggleError(input, isValid, message) {
        input.classList.toggle('valid', isValid);
        input.classList.toggle('invalid', !isValid);

        let errorDiv = input.nextElementSibling;
        if (!errorDiv?.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
        errorDiv.textContent = isValid ? '' : message;
    }

    // Form submission handler
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = ['name', 'category', 'price', 'quantity'].map(
            name => productForm.querySelector(`[name="${name}"]`)
        );

        // Validate all required fields
        const isValid = inputs.every(input => validateInput(input));

        if (!isValid) {
            showAlert('Please fix the errors before submitting', 'danger');
            return;
        }

        // Add new product to table
        const newProduct = {
            id: `#${String(productId).padStart(6, '0')}`,
            name: inputs[0].value,
            category: inputs[1].value,
            price: Number(inputs[2].value),
            quantity: Number(inputs[3].value)
        };

        addProductToTable(newProduct);
        productId++;
        
        // Reset form and show success message
        productForm.reset();
        inputs.forEach(input => input.classList.remove('valid', 'invalid'));
        showAlert('Product added successfully!', 'success');
    });

    function addProductToTable(product) {
        const row = document.createElement('tr');
        row.classList.add('new-product');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price.toLocaleString()}</td>
            <td>${product.quantity}</td>
        `;

        // Add to top of table
        if (productTable.firstChild) {
            productTable.insertBefore(row, productTable.firstChild);
        } else {
            productTable.appendChild(row);
        }
    }

    function showAlert(message, type) {
        const alertContainer = document.getElementById('alertContainer');
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        alertContainer.appendChild(alert);

        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 150);
        }, 3000);
    }
});