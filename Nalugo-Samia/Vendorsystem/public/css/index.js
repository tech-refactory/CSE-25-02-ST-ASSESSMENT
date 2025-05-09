document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    document.querySelectorAll('.error-message').forEach(function(el) {
        el.textContent = '';
      });
    
    form.addEventListener('submit', function (event) {
      // Retrieve form values
      const pname = document.getElementById('pname');
      const category = document.getElementById('category');
      const price = document.getElementById('price');
      const quantity = document.getElementById('quantity');
      const color = document.getElementById('color');
      const uploadimage = document.getElementById('uploadimage');
  
      // Define regex patterns
      const nameRegex = /^[a-zA-Z0-9\s]{2,50}$/;
      const categoryRegex = /^[a-zA-Z\s]{2,30}$/;
      const priceRegex = /^\d+(\.\d{1,2})?$/;
      const quantityRegex = /^\d+$/;
      const colorRegex = /^[a-zA-Z\s]{3,20}$/;
  
      let isValid = true;
  
      // Validate Product Name
      if (!nameRegex.test(pname.value.trim())) {
        pname.style.border = "1px solid red";
        document.getElementById('pnameError').textContent = 'Invalid field';
        isValid = false;
      } else {
        pname.style.border = "1px solid green";
      }
  
      // Validate Category
      if (!categoryRegex.test(category.value.trim())) {
        category.style.border = "1px solid red";
        document.getElementById('categoryError').textContent = 'Invalid field';
        isValid = false;
      } else {
        category.style.border = "1px solid green";
      }
  
      // Validate Price
      if (!priceRegex.test(price.value.trim()) || parseFloat(price.value.trim()) <= 0) {
        price.style.border = "1px solid red";
        document.getElementById('priceError').textContent = 'Invalid field';
        isValid = false;
      } else {
        price.style.border = "1px solid green";
      }
  
      // Validate Quantity
      if (!quantityRegex.test(quantity.value.trim()) || parseInt(quantity.value.trim()) <= 0) {
        quantity.style.border = "1px solid red";
        document.getElementById('quantityError').textContent = 'Invalid field';
        isValid = false;
      } else {
        quantity.style.border = "1px solid green";
      }
  
      // Validate Color
      if (!colorRegex.test(color.value.trim())) {
        color.style.border = "1px solid red";
        document.getElementById('colorError').textContent = 'Invalid field';
        isValid = false;
      } else {
        color.style.border = "1px solid green";
      }
  
      // Validate Image Upload
      if (!uploadimage.value) {
        uploadimage.style.border = "1px solid red";
        document.getElementById('uploadimageError').textContent = 'Invalid field';
        isValid = false;
      } else {
        uploadimage.style.border = "1px solid green";
      }
  
      if (!isValid) {
        event.preventDefault(); // Prevent form submission
        document.getElementById("formError").style.color = "red";
        document.getElementById("formError").textContent = "Invalid field";
       // alert("Invalid field.");
      }
    });
  });
  
  //success dialog box 
  
  document.addEventListener('DOMContentLoaded', function () {
    var success = !{success};
    if (success) {
      $('#successModal').modal('show');
    }
  });
