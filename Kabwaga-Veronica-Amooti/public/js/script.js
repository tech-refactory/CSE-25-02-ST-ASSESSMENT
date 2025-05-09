document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('productForm');
  const inputs = form.querySelectorAll('input');

  form.addEventListener('submit', (e) => {
    let valid = true;

    inputs.forEach(input => {
      const errorSpan = input.nextElementSibling;
      if (!input.value.trim()) {
        errorSpan.textContent = 'This field is required.';
        input.classList.add('invalid');
        input.classList.remove('valid');
        valid = false;
      } else {
        errorSpan.textContent = '';
        input.classList.remove('invalid');
        input.classList.add('valid');
      }
    });

    if (!valid) e.preventDefault();
  });

  form.addEventListener('reset', () => {
    inputs.forEach(input => {
      input.classList.remove('valid', 'invalid');
      input.nextElementSibling.textContent = '';
    });
    setTimeout(() => window.location.reload(), 300); // Refresh to update table
  });
});
