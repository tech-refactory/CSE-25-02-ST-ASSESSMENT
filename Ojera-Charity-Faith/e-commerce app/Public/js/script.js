fetch('/api/dashboard')
  .then(res => res.json())
  .then(data => {
    document.getElementById('sales-card').innerHTML = `<b>UGX ${data.sales.toLocaleString()}</b><br>Sales`;
    document.getElementById('orders-card').innerHTML = `<b>UGX ${data.orders.toLocaleString()}</b><br>Orders`;
    document.getElementById('stock-card').innerHTML = `<b>UGX ${data.inStock.toLocaleString()}</b><br>In stock`;
    document.getElementById('outofstock-card').innerHTML = `<b>${data.outOfStock}</b><br>Out of stock`;

    const tbody = document.getElementById('product-table-body');
    data.products.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${p.id}</td><td>${p.name}</td><td>${p.category}</td><td>${p.price.toLocaleString()}</td><td>${p.quantity}</td>`;
      tbody.appendChild(tr);
    });
  });