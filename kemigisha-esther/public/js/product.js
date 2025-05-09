document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('productForm');
    const inputs = form.querySelectorAll('input');
  
    form.addEventListener('submit', (e) => {
      let valid = true;
  
      inputs.forEach(input => {
        const errorSpan = input.nextElementSibling;
        if (!input.value.trim()) {
          errorSpan.textContent = 'Invalid field';
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
  });


  //success message
  window.onload = () => {
    const alert = document.querySelector('.alert');
    if (alert) {
      setTimeout(() => {
        alert.style.display = 'none';
      }, 3000); 
    }
  };

