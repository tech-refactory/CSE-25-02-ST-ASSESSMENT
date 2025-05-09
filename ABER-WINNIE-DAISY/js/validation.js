document.getElementById('creditSaleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset previous messages
    clearMessages();
    
    let isValid = true;
    
    // Product Name validation
    const productName = document.getElementById('prodctName').value;
    if (productName.trim() === '') {
        showError('prodctName', 'Product name is required');
        isValid = false;
    } else {
        showSuccess('prodctName');
    }
    
    // Category validation
    const category = document.getElementById('catergory').value;
    if (category.trim() === '') {
        showError('catergory', 'Category is required');
        isValid = false;
    } else {
        showSuccess('catergory');
    }
    
    // Price validation
    const price = document.getElementById('price').value;
    if (price.trim() === '') {
        showError('price', 'Price is required');
        isValid = false;
    } else if (isNaN(price) || price <= 0) {
        showError('price', 'Please enter a valid price');
        isValid = false;
    } else {
        showSuccess('price');
    }
    
    // Quantity validation
    const quantity = document.getElementById('quantity').value;
    if (quantity.trim() === '') {
        showError('quantity', 'Quantity is required');
        isValid = false;
    } else if (!Number.isInteger(Number(quantity)) || quantity < 0) {
        showError('quantity', 'Please enter a valid quantity');
        isValid = false;
    } else {
        showSuccess('quantity');
    }
    
    // Color validation
    const color = document.getElementById('color').value;
    if (color.trim() === '') {
        showError('color', 'Color is required');
        isValid = false;
    } else {
        showSuccess('color');
    }
    
    if (isValid) {
        // Show success message
        showFormSuccess();
        // Reset the form
        document.getElementById('creditSaleForm').reset();
        // Clear success styling after 3 seconds
        setTimeout(() => {
            clearMessages();
        }, 3000);
    }
});

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
    input.style.borderColor = 'red';
}

function showSuccess(inputId) {
    const input = document.getElementById(inputId);
    input.style.borderColor = 'green';
    const successDiv = document.createElement('div');
    successDiv.className = 'message success-message';
    successDiv.style.color = 'green';
    successDiv.style.fontSize = '12px';
    successDiv.style.marginTop = '5px';
    successDiv.textContent = '✓';
    input.parentNode.insertBefore(successDiv, input.nextSibling);
}

function showFormSuccess() {
    const formDiv = document.getElementById('creditSaleForm');
    const successMessage = document.createElement('div');
    successMessage.className = 'message form-success';
    successMessage.style.color = 'green';
    successMessage.style.fontSize = '16px';
    successMessage.style.padding = '10px';
    successMessage.style.marginTop = '10px';
    successMessage.style.backgroundColor = '#e8f5e9';
    successMessage.style.borderRadius = '4px';
    successMessage.style.textAlign = 'center';
    successMessage.textContent = 'Form submitted successfully!';
    formDiv.appendChild(successMessage);
}

function clearMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => message.remove());
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.style.borderColor = '#ddd');
}