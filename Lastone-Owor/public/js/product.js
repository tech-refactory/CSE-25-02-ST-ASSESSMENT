document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("productForm");
    const successMessage = document.getElementById("success-message");
    const productTable = document.getElementById("productTable");
  
    // Clear success message initially
    successMessage.style.display = "none";
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      // Get and trim values
      const name = form.name.value.trim();
      const category = form.category.value.trim();
      const price = parseFloat(form.price.value);
      const quantity = parseInt(form.quantity.value);
      const color = form.color.value.trim();
  
      // Validation: no empty fields
      if (!name || !category || isNaN(price) || isNaN(quantity) || !color) {
        alert("All fields are required and must be valid.");
        return;
      }
  
      // Additional validation rules (example: meaningful values)
      if (price <= 0 || quantity < 0) {
        alert("Price must be greater than 0 and quantity must not be negative.");
        return;
      }
  
      // Submit data
      try {
        const res = await fetch("/add-product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, category, price, quantity, color })
        });
  
        if (res.ok) {
          // Show success message
          successMessage.textContent = "Product added successfully!";
          successMessage.style.display = "block";
  
          // Reset form
          form.reset();
  
          // Reload page to fetch updated product list
          setTimeout(() => {
            successMessage.style.display = "none";
            window.location.reload(); // Or fetch table data dynamically
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
  