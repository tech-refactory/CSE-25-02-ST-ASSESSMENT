document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("productForm");

  productForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop native form submit

    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll(".error").forEach(el => el.innerText = "");

    function showError(id, message) {
      const errorEl = document.getElementById(id);
      if (errorEl) errorEl.innerText = message;
    }

    // Get input values
    const productName = document.getElementById("productName").value.trim();
    const category = document.getElementById("category").value.trim();
    const price = document.getElementById("price").value.trim();
    const quantity = document.getElementById("quantity").value.trim();
    const color = document.getElementById("color").value.trim();
    const image = document.getElementById("image").value.trim();

    // Validate each field
    if (!productName) {
      showError("nameError", "Invalid field.");
      isValid = false;
    }

    if (!category) {
      showError("categoryError", "Invalid field.");
      isValid = false;
    }

    if (!price || isNaN(price)) {
      showError("priceError", "Must be a number.");
      isValid = false;
    }

    if (!/^[0-9]+$/.test(quantity)) {
      showError("quantityError", "Must be a valid quantity.");
      isValid = false;
    }

    if (!color) {
      showError("colorError", "Invalid field.");
      isValid = false;
    }

    if (!image) {
      showError("imageError", "Invalid field.");
      isValid = false;
    }

    if (isValid) {
      alert("Product has been added successfully");
      productForm.submit(); // Now safe to submit the form
    }
  });
});
