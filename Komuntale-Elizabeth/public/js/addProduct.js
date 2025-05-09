function validateForm(event) {
  event.preventDefault(); // prevent by default, submit manually if valid

  const fields = [
    { id: 'productName', minLength: 3 },
    { id: 'category', minLength: 3 },
    { id: 'price', min: 1, isNumber: true },
    { id: 'quantity', min: 1, isNumber: true },
    { id: 'color', minLength: 3 }
  ];

  let allValid = true;

  fields.forEach(field => {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.id + 'Error');
    const value = input.value.trim();

    let isValid = true;
    if (field.isNumber) {
      isValid = !isNaN(value) && Number(value) >= field.min;
    } else {
      isValid = value.length >= field.minLength;
    }

    if (isValid) {
      input.classList.remove('invalid');
      input.classList.add('valid');
      error.textContent = '';
    } else {
      input.classList.remove('valid');
      input.classList.add('invalid');
      error.textContent = 'Invalid input';
      allValid = false;
    }
  });

  const messageDiv = document.getElementById('successMessage');

  if (allValid) {
    messageDiv.textContent = 'Product has been added successfully!';
    messageDiv.style.display = 'block';
    messageDiv.style.color = 'green';

    // Actually submit the form
    event.target.submit();
  } else {
    messageDiv.style.display = 'none';
  }
}


