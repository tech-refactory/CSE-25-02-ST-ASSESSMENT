document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productTable = document.getElementById('productTable');
    const inputs = productForm.querySelectorAll('input[required]');
    
    // Validate inputs on change
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });
    
    function validateInput(input) {
        if (input.type === 'number') {
            const isValid = input.value > 0;
            input.classList.toggle('valid', isValid);
            input.classList.toggle('invalid', !isValid);
            return isValid;
        } else {
            const isValid = input.value.trim().length > 0;
            input.classList.toggle('valid', isValid);
            input.classList.toggle('invalid', !isValid);
            return isValid;
        }
    }
    
    // Handle form submission
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all required fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) return;
        
        const formData = {
            name: productForm.querySelector('[name="name"]').value,
            category: productForm.querySelector('[name="category"]').value,
            price: Number(productForm.querySelector('[name="price"]').value),
            quantity: Number(productForm.querySelector('[name="quantity"]').value),
            color: productForm.querySelector('[name="color"]').value
        };
        
        try {
            const response = await fetch('products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                const newProduct = await response.json();
                showAlert('Product added successfully!', 'success');
                productForm.reset();
                inputs.forEach(input => input.classList.remove('valid'));
                await fetchProducts();
            }
        } catch (error) {
            showAlert('Error adding product', 'error');
            console.error('Error:', error);
        }
    });
    
  function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.getElementById('alertContainer').appendChild(alert);
    
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 150);
    }, 3000);
}
    
    // Fetch and display products
    async function fetchProducts() {
        try {
            const response = await fetch('products');
            const products = await response.json();
            
            productTable.innerHTML = products.map(product => `
                <tr class="new-product">
                    <td>${product._id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>UGX ${product.price.toLocaleString()}</td>
                    <td>${product.quantity}</td>
                </tr>
            `).join('');
            
            updateStats(products);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    // Initial load
    fetchProducts();
});