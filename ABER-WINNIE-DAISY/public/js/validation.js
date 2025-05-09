document.getElementById('creditSaleForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    clearMessages();
    let isValid = true;
    
    const fields = ['prodctName', 'catergory', 'price', 'quantity', 'color'];
    
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            showError(field, 'Invalid field');
            isValid = false;
        }
    });
    
    if (isValid) {
        try {
            const formData = {
                productName: document.getElementById('prodctName').value,
                category: document.getElementById('catergory').value,
                price: document.getElementById('price').value,
                quantity: document.getElementById('quantity').value,
                color: document.getElementById('color').value,
                image: document.getElementById('upload').value
            };

            const response = await fetch('/index/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showFormSuccess();
                document.getElementById('creditSaleForm').reset();
                fetchAndDisplayRecords();
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
    const successMessage = document.createElement('div');
    successMessage.className = 'success-popup';
    successMessage.textContent = 'Product has been added successfully!';
    document.body.appendChild(successMessage);

    // Remove the message after 3 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

function clearMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => message.remove());
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.style.borderColor = '#ddd');
}

async function fetchAndDisplayRecords() {
    try {
        const response = await fetch('/index/records');
        const records = await response.json();
        
        const tbody = document.querySelector('#productTable tbody');
        tbody.innerHTML = '';
        
        records.forEach(record => {
            const row = `
                <tr>
                    <td>${record._id}</td>
                    <td>${record.productName}</td>
                    <td>${record.category}</td>
                    <td>${record.price}</td>
                    <td>${record.quantity}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call this function when page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayRecords);