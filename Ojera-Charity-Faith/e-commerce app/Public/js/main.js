document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addProductForm");
  const table = document.getElementById("productsTable");
  const clearBtn = document.getElementById("clearBtn");

  // Load initial data
  fetchInsights();
  fetchProducts();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const product = {
      name: formData.get("name").trim(),
      category: formData.get("category").trim(),
      price: parseFloat(formData.get("price")),
      quantity: parseInt(formData.get("quantity")),
      color: formData.get("color").trim()
    };

    // Basic Validation
    if (!product.name || !product.category || isNaN(product.price) || isNaN(product.quantity) || !product.color) {
      alert("Please fill all fields correctly.");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        form.reset();
        showAlert("Product added successfully!");
        fetchProducts();
      } else {
        alert("Failed to add product.");
      }
    } catch (err) {
      console.error(err);
    }
  });

  clearBtn.addEventListener("click", () => {
    form.reset();
    showAlert("Form cleared successfully!");
    fetchProducts();
  });

  function showAlert(message) {
    const alertBox = document.createElement("div");
    alertBox.className = "alert success";
    alertBox.innerText = message;
    form.parentElement.insertBefore(alertBox, form);

    setTimeout(() => alertBox.remove(), 3000);
  }

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const products = await res.json();
    table.innerHTML = "";
    products.forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>#${p._id.slice(-6)}</td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.price.toLocaleString()} UGX</td>
        <td>${p.quantity}</td>
      `;
      table.appendChild(row);
    });
  }

  async function fetchInsights() {
    const res = await fetch("/api/insights");
    const data = await res.json();
    document.querySelectorAll(".card")[0].innerHTML = `
      <h2>UGX ${data.sales.toLocaleString()}</h2><span>Sales</span><hr>
      <h2>UGX ${data.orders.toLocaleString()}</h2><span>Orders</span>`;
    document.querySelector(".card.green h2").textContent = `UGX ${data.inStock.toLocaleString()}`;
    document.querySelector(".card.red h2").textContent = data.outOfStock;
  }
});
