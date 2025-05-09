let currentPage = 1;
const itemsPerPage = 10;

document.addEventListener('DOMContentLoaded', () => {
    loadDashboardData();
    loadProducts(currentPage);
    
    const form = document.getElementById('productForm');
    const clearBtn = document.querySelector('.clearBtn');
    
    form.addEventListener('submit', handleSubmit);
    clearBtn.addEventListener('click', handleClear);
});

async function loadDashboardData() {
    try {
        const response = await fetch('/api/dashboard-stats');
        const data = await response.json();
        
        if (data.success) {
            updateDashboardValues(data);
        }
    } catch (error) {
        showAlert('Error loading dashboard data', 'danger');
    }
}

function updateDashboardValues(data) {
    document.getElementById('totalSales').textContent = `UGX ${formatNumber(data.totalSales)}`;
    document.getElementById('totalOrders').textContent = `UGX ${formatNumber(data.expectedRevenue)}`;
    document.getElementById('inStock').textContent = `UGX ${formatNumber(data.capitalInStock)}`;
    document.getElementById('outOfStock').textContent = data.outOfStock;
}

async function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert('Product added successfully', 'success');
            handleClear();
            loadDashboardData();
            loadProducts(currentPage);
        } else {
            showAlert(data.message || 'Error adding product', 'danger');
        }
    } catch (error) {
        showAlert('Error submitting form', 'danger');
    }
}

function validateForm() {
    const form = document.getElementById('productForm');
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

function handleClear() {
    const form = document.getElementById('productForm');
    form.reset();
    
    form.querySelectorAll('.is-invalid').forEach(input => {
        input.classList.remove('is-invalid');
    });
    
    showAlert('Form cleared successfully', 'info');
}

async function loadProducts(page) {
    try {
        const response = await fetch(`/api/products?page=${page}&limit=${itemsPerPage}`);
        const data = await response.json();
        
        if (data.success) {
            renderProducts(data.products);
            renderPagination(data.totalPages);
        }
    } catch (error) {
        showAlert('Error loading products', 'danger');
    }
}

function renderProducts(products) {
    const tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = '';
    
    products.forEach(product => {
        const row = `
            <tr>
                <td>${product._id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>UGX ${formatNumber(product.price)}</td>
                <td>${product.quantity}</td>
                <td>${product.color}</td>
                <td><img src="${product.image}" alt="Product" width="50" height="50"></td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const button = `
            <button class="btn btn-${i === currentPage ? 'primary' : 'outline-primary'} mx-1"
                    onclick="changePage(${i})">${i}</button>
        `;
        pagination.insertAdjacentHTML('beforeend', button);
    }
}

function changePage(page) {
    currentPage = page;
    loadProducts(page);
}

function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    const alert = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    alertContainer.insertAdjacentHTML('beforeend', alert);
    
    setTimeout(() => {
        const alertElement = alertContainer.querySelector('.alert');
        if (alertElement) alertElement.remove();
    }, 3000);
}

function formatNumber(number) {
    return number.toLocaleString('en-US');
}