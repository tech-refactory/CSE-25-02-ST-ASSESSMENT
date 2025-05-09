document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("productForm");
    const productName = document.getElementById("productname");
    const category = document.getElementById("category");
    const price = document.getElementById("price");
    const quantity = document.getElementById("quantity");
    const color = document.getElementById("color");
    const image = document.getElementById("image");
    
    const errorProductName = document.getElementById("error-productname");
    const errorCategory = document.getElementById("error-category");
    const errorPrice = document.getElementById("error-price");
    const errorQuantity = document.getElementById("error-quantity");
    const errorColor = document.getElementById("error-color");
    const errorImage = document.getElementById("error-image");

    form.addEventListener("submit", function (e) {
        let isValid = true;

        // Clear previous error messages
        errorProductName.textContent = '';
        errorCategory.textContent = '';
        errorPrice.textContent = '';
        errorQuantity.textContent = '';
        errorColor.textContent = '';
        errorImage.textContent = '';

        // Validate product name
        if (productName.value.trim() === "") {
            isValid = false;
            errorProductName.textContent = 'Product name is required.';
            productName.classList.add('is-invalid');
        } else {
            productName.classList.remove('is-invalid');
        }

        // Validate category
        if (category.value.trim() === "") {
            isValid = false;
            errorCategory.textContent = 'Category is required.';
            category.classList.add('is-invalid');
        } else {
            category.classList.remove('is-invalid');
        }

        // Validate price (should not be less than 40,000)
        if (price.value.trim() === "") {
            isValid = false;
            errorPrice.textContent = 'Price is required.';
            price.classList.add('is-invalid');
        } else if (parseFloat(price.value) < 40000) {
            isValid = false;
            errorPrice.textContent = 'Price must be at least 40,000 UGX.';
            price.classList.add('is-invalid');
        } else {
            price.classList.remove('is-invalid');
        }

        // Validate quantity
        if (quantity.value.trim() === "") {
            isValid = false;
            errorQuantity.textContent = 'Quantity is required.';
            quantity.classList.add('is-invalid');
        } else {
            quantity.classList.remove('is-invalid');
        }

        // Validate color
        if (color.value.trim() === "") {
            isValid = false;
            errorColor.textContent = 'Color is required.';
            color.classList.add('is-invalid');
        } else {
            color.classList.remove('is-invalid');
        }

        // Validate image URL (should not be empty)
        if (image.value.trim() === "") {
            isValid = false;
            errorImage.textContent = 'Image URL is required.';
            image.classList.add('is-invalid');
        } else {
            const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))$/;
            if (!urlPattern.test(image.value)) {
                isValid = false;
                errorImage.textContent = 'Please provide a valid image URL.';
                image.classList.add('is-invalid');
            } else {
                image.classList.remove('is-invalid');
            }
        }

        // If the form is not valid, prevent submission
        if (!isValid) {
            e.preventDefault();
        } else {
            // Set green border if all fields are valid
            if (productName.value && category.value && price.value >= 40000 && quantity.value && color.value && image.value) {
                productName.classList.add('is-valid');
                category.classList.add('is-valid');
                price.classList.add('is-valid');
                quantity.classList.add('is-valid');
                color.classList.add('is-valid');
                image.classList.add('is-valid');
            }
        }
    });
});
