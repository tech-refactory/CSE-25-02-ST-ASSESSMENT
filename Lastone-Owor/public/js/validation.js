document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const successMessage = document.getElementById("success-message");
  const productTable = document.getElementById("productTable");

  // Input fields
  const fields = ["name", "category", "price", "quantity", "color"];

  // Clear success message initially
  successMessage.style.display = "none";

  // Utility to validate a single field
  const validateField = (input) => {
    const value = input.value.trim();
    if (!value || (input.name === "price" && parseFloat(value) <= 0) || (input.name === "quantity" && parseInt(value) < 0)) {
      input.style.border = "2px solid red";
      return false;
    } else {
      input.style.border = "2px solid green";
      return true;
    }
  };

  // Validate fields on input
  fields.forEach((fieldName) => {
    const input = form[fieldName];
    input.addEventListener("input", () => validateField(input));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;
    fields.forEach((fieldName) => {
      const input = form[fieldName];
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      alert("All fields are required and must be valid.");
      return;
    }

    const name = form.name.value.trim();
    const category = form.category.value.trim();
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const color = form.color.value.trim();

    try {
      const res = await fetch("/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, price, quantity, color })
      });

      if (res.ok) {
        successMessage.textContent = "Product added successfully!";
        successMessage.style.display = "block";

        form.reset();
        fields.forEach((fieldName) => form[fieldName].style.border = "");

        setTimeout(() => {
          successMessage.style.display = "none";
          window.location.reload();
        }, 1500);
      } else {
        const error = await res.json();
        alert(`Error: ${error.message || "Could not save product."}`);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("An unexpected error occurred.");
    }
  });
});
