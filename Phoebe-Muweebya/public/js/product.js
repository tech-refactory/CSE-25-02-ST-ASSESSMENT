let productForm = document.getElementById("productForm");

//let tableBod = document.getElementById("procuredTable").getElementsByTagName("tbody")[0];

let tableBody = document.querySelector("#productTable tbody")

// element.addEventListener("event", function)

productForm.addEventListener("submit", function(event){
  event.preventDefault()

  // Get form values
  const productData = {
    productName: document.getElementById("productName").value,
    category: document.getElementById("category").value,
    price: document.getElementById("price").value,
    quantity: document.getElementById("quantity").value,
    
    color: document.getElementById("color").value,
    image: document.getElementById("image").value,
   

  }

    console.log("information submitted")
    
});


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("productForm").addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission if validation fails

      let isValid = true;
      
      function showError(id, message) {
          document.getElementById(id).innerText = message;
      }

      function clearErrors() {
          document.querySelectorAll(".error").forEach(el => el.innerText = "");
      }

      clearErrors();

      let productName = document.getElementById("productName").value.trim();
      if (!productName) {
          showError("nameError", "Invalid field.");
          isValid = false;
      }

      let category = document.getElementById("category").value.trim();
      if (!category) {
          showError("categoryError", "Invalid field.");
          isValid = false;
      }
      let price = document.getElementById("price").value.trim();
      if (!price || isNaN(price)) {
          showError("priceError", "Invalid field.");
          isValid = false;
      }


      


      let quantity = document.getElementById("quantity").value.trim();
      if (!/^[0-9]{1,}$/.test(quantity)) {
          showError("quantityError", "Invalid field");
          isValid = false;
      }

      let color = document.getElementById("color").value.trim();
      if (!color) {
          showError("colorError", "Invalid field.");
          isValid = false;
      }

      let image = document.getElementById("image").value.trim();
      if (!image) {
          showError("imageError", "Invalid field.");
          isValid = false;
      }

      

      

      if (isValid) {
          alert("Form submitted successfully!");
          this.submit(); // Submit the form if all validations pass
      }
  });
});
