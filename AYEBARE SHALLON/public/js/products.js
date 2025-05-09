document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productTable = document.getElementById('productTable');
    
    // Load products on page load
    fetchProducts();
    
    // Handle form submission
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: productForm.querySelector('[name="name"]').value,
            category: productForm.querySelector('[name="category"]').value,
            price: Number(productForm.querySelector('[name="price"]').value),
            quantity: Number(productForm.querySelector('[name="quantity"]').value),
            color: productForm.querySelector('[name="color"]').value
        };
        
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                productForm.reset();
                fetchProducts();
            } else {
                throw new Error('Failed to add product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
    
    // Fetch and display products
    async function fetchProducts() {
        try {
            const response = await fetch('/api/products');
            const products = await response.json();
            
            productTable.innerHTML = products.map(product => `
                <tr>
                    <td>${product._id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.price.toLocaleString()}</td>
                    <td>${product.quantity}</td>
                </tr>
            `).join('');
            
            updateStats(products);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    // Update statistics
    function updateStats(products) {
        const stats = {
            sales: products.reduce((sum, p) => sum + (p.price * (p.initialQuantity - p.quantity)), 0),
            orders: products.reduce((sum, p) => sum + (p.initialQuantity - p.quantity), 0),
            inStock: products.reduce((sum, p) => sum + (p.price * p.quantity), 0),
            outOfStock: products.filter(p => p.quantity === 0).length
        };
        
        document.querySelector('.sales').textContent = `UGX ${stats.sales.toLocaleString()}`;
        document.querySelector('.orders').textContent = `UGX ${stats.orders.toLocaleString()}`;
        document.querySelector('.in-stock').textContent = `UGX ${stats.inStock.toLocaleString()}`;
        document.querySelector('.out-of-stock').textContent = stats.outOfStock;
    }
});