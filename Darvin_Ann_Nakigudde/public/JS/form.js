document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const productForm = document.getElementById('product-form');
    const clearButton = document.getElementById('clear-button');
    const alertContainer = document.getElementById('alert-container');
    const productTableBody = document.getElementById('product-table-body');
    
    // Form fields
    const formFields = {
      name: document.getElementById('product-name'),
      category: document.getElementById('category'),
      price: document.getElementById('price'),
      quantity: document.getElementById('quantity'),
      color: document.getElementById('color'),
      imageUrl: document.getElementById('image-url')
    };
    
    // Error message elements
    const errorMessages = {
      name: document.getElementById('product-name-error'),
      category: document.getElementById('category-error'),
      price: document.getElementById('price-error'),
      quantity: document.getElementById('quantity-error'),
      color: document.getElementById('color-error'),
      imageUrl: document.getElementById('image-url-error')
    };
    
    // Form validation
    function validateForm() {
      let isValid = true;
      
      // Clear all error messages first
      Object.values(errorMessages).forEach(el => el.textContent = '');
      
      // Required fields validation
      if (!formFields.name.value.trim()) {
        errorMessages.name.textContent = 'Product name is required';
        isValid = false;
      }
      
      if (!formFields.category.value.trim()) {
        errorMessages.category.textContent = 'Category is required';
        isValid = false;
      }
      
      // Price validation
      if (!formFields.price.value.trim()) {
        errorMessages.price.textContent = 'Price is required';
        isValid = false;
      } else if (isNaN(formFields.price.value) || parseFloat(formFields.price.value) < 0) {
        errorMessages.price.textContent = 'Please enter a valid price';
        isValid = false;
      }
      
      // Quantity validation
      if (!formFields.quantity.value.trim()) {
        errorMessages.quantity.textContent = 'Quantity is required';
        isValid = false;
      } else if (isNaN(formFields.quantity.value) || parseInt(formFields.quantity.value) < 0) {
        errorMessages.quantity.textContent = 'Please enter a valid quantity';
        isValid = false;
      }
      
      return isValid;
    }
    
    // Reset form
    function resetForm() {
      productForm.reset();
      Object.values(errorMessages).forEach(el => el.textContent = '');
      
      // Show success message
      showAlert('Form has been cleared', 'success');
      
      // Add animation to form
      productForm.classList.add('form-reset');
      setTimeout(() => {
        productForm.classList.remove('form-reset');
      }, 300);
    }
    
    // Show alert message
    function showAlert(message, type) {
      const alertEl = document.createElement('div');
      alertEl.className = `alert alert-${type}`;
      alertEl.textContent = message;
      
      // Clear existing alerts
      alertContainer.innerHTML = '';
      alertContainer.appendChild(alertEl);
      
      // Auto-close alert after 3 seconds
      setTimeout(() => {
        alertEl.style.opacity = '0';
        setTimeout(() => {
          alertContainer.removeChild(alertEl);
        }, 300);
      }, 3000);
    }
    
    // Update product table
    function updateProductTable(products) {
      productTableBody.innerHTML = '';
      
      products.forEach(product => {
        const row = document.createElement('tr');
        
        // Format price with commas
        const formattedPrice = new Intl.NumberFormat().format(product.price);
        
        row.innerHTML = `
          <td>${product.productId}</td>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>${formattedPrice}</td>
          <td>${product.quantity}</td>
        `;
        
        productTableBody.appendChild(row);
      });
    }
    
    // Update statistics
    function updateStats(stats) {
      if (stats.inStock !== undefined) {
        const inStockElement = document.querySelector('.in-stock');
        inStockElement.textContent = `UGX ${new Intl.NumberFormat().format(stats.inStock)}`;
      }
      
      if (stats.outOfStock !== undefined) {
        const outOfStockElement = document.querySelector('.out-of-stock-count');
        outOfStockElement.textContent = stats.outOfStock;
      }
    }
    
    // Form submission handler
    productForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm()) {
        // Get form data
        const formData = {
          name: formFields.name.value.trim(),
          category: formFields.category.value.trim(),
          price: formFields.price.value.trim(),
          quantity: formFields.quantity.value.trim(),
          color: formFields.color.value.trim(),
          imageUrl: formFields.imageUrl.value.trim()
        };
        
        // Send form data to server
        fetch('/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Reset form
            resetForm();
            
            // Show success message
            showAlert('Product added successfully!', 'success');
            
            // Update product table
            updateProductTable(data.products);
            
            // Update stats
            updateStats(data.stats);
          } else {
            // Show validation errors
            if (data.errors) {
              Object.keys(data.errors).forEach(field => {
                if (errorMessages[field]) {
                  errorMessages[field].textContent = data.errors[field];
                }
              });
            } else {
              showAlert('Error adding product', 'danger');
            }
          }
        })
        .catch(error => {
          console.error('Error:', error);
          showAlert('An error occurred. Please try again.', 'danger');
        });
      }
    });
    
    // Clear button event listener
    clearButton.addEventListener('click', resetForm);
  });