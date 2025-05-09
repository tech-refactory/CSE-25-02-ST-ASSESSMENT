// Function to format numbers with commas
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Get elements
document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');
    const clearFormBtn = document.getElementById('clearForm');
    const fileInput = document.getElementById('productImage');
    const fileNameDisplay = document.getElementById('fileName');
    
    // File input change event
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileNameDisplay.textContent = this.files[0].name;
            } else {
                fileNameDisplay.textContent = 'No file chosen';
            }
        });
    }
    
    // Clear form button
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', function() {
            productForm.reset();
            fileNameDisplay.textContent = 'No file chosen';
            
            // Remove any error messages
            const errorMessages = document.querySelectorAll('.errorlist');
            errorMessages.forEach(function(error) {
                error.innerHTML = '';
            });
        });
    }
    
    // Auto hide success message after 3 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            alert.style.display = 'none';
        }, 3000);
    });
}); 