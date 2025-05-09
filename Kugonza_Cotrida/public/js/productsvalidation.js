document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const fields = [
    { id: "productname", type: "text" },
    { id: "category", type: "text" },
    { id: "price", type: "number", min: 40000 },
    { id: "quantity", type: "number" },
    { id: "color", type: "text" },
    { id: "image", type: "url" },
  ];

  let currentId = document.querySelectorAll("#product-body tr").length;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;
    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      const errorDiv = document.getElementById(`${field.id}-error`);
      input.classList.remove("is-invalid", "is-valid");
      errorDiv.textContent = "";

      if (!input.value.trim()) {
        errorDiv.textContent = "This field is required.";
        input.classList.add("is-invalid");
        valid = false;
      } else if (field.type === "text" && !/[a-zA-Z]/.test(input.value)) {
        errorDiv.textContent = "This field must contain text.";
        input.classList.add("is-invalid");
        valid = false;
      } else if (field.id === "price" && parseFloat(input.value) < field.min) {
        errorDiv.textContent = `Price must be at least UGX ${field.min}.`;
        input.classList.add("is-invalid");
        valid = false;
      } else {
        input.classList.add("is-valid");
      }
    });

    if (valid) {
      alert("Product saved successfully!");
      currentId += 1;

      const tbody = document.getElementById("product-body");
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${currentId}</td>
        <td>${document.getElementById("productname").value}</td>
        <td>${document.getElementById("category").value}</td>
        <td>${document.getElementById("price").value}</td>
        <td>${document.getElementById("quantity").value}</td>
      `;
      tbody.appendChild(row);
      form.reset();

      fields.forEach(f => {
        const input = document.getElementById(f.id);
        input.classList.remove("is-invalid");
        if (input.classList.contains("is-valid")) {
          input.classList.add("is-valid");
        }
      });
    }
  });

  document.getElementById("clear-btn").addEventListener("click", () => {
    fields.forEach(f => {
      const input = document.getElementById(f.id);
      const errorDiv = document.getElementById(`${f.id}-error`);
      input.classList.remove("is-valid", "is-invalid");
      errorDiv.textContent = "";
    });
  });
});
