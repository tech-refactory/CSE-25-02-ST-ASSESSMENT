function validateform() {
    const nameField = document.getElementById("name");
    const categoryField = document.getElementById("category");
    const priceField = document.getElementById("price");
    const quantityField = document.getElementById("quantity");
    const colorField = document.getElementById("color");
    const imageField = document.getElementById("image");
    const successMessage = document.getElementById("successmessage");
    
  
  
    const name = nameField.value.trim();
    const category = categoryField.value.trim();
    const price = priceField.value;
    const quantity = quantityField.value;
    const color = colorField.value.trim();
    const image = imageField.files[0]; // Correct for file input
  
    const nameErr = document.getElementById("name-error");
    const categoryErr = document.getElementById("category-error");
    const priceErr = document.getElementById("price-error");
    const quantityErr = document.getElementById("quantity-error");
    const colorErr = document.getElementById("color-error");
    const imageErr = document.getElementById("image-error");
  
    // Reset styles
    [nameField, categoryField, priceField, quantityField, colorField, imageField].forEach(field => {
      field.style.border = "";
    });
  
    nameErr.textContent = "";
    categoryErr.textContent = "";
    priceErr.textContent = "";
    quantityErr.textContent = "";
    colorErr.textContent = "";
    imageErr.textContent = "";
  
    let isValid = true;
  
    // Name validation
    if (name === "") {
      nameErr.textContent = "Enter a valid product name.";
      nameField.style.border = "2px solid red";
      isValid = false;
    } else {
      nameField.style.border = "2px solid green";
    }
  
    // Category validation
    if (category === "" || /\d/.test(category)) {
      categoryErr.textContent = "Enter a product category.";
      categoryField.style.border = "2px solid red";
      isValid = false;
    } else {
      categoryField.style.border = "2px solid green";
    }
  
    // Price validation
    if (price === "" || isNaN(price) || Number(price) <= 0) {
      priceErr.textContent = "Enter a valid price greater than 0.";
      priceField.style.border = "2px solid red";
      isValid = false;
    } else {
      priceField.style.border = "2px solid green";
    }
  
    // Quantity validation
    if (quantity === "" || isNaN(quantity) || Number(quantity) <= 0) {
      quantityErr.textContent = "Enter a valid quantity.";
      quantityField.style.border = "2px solid red";
      isValid = false;
    } else {
      quantityField.style.border = "2px solid green";
    }
  
    // Color validation
    if (color === "" || /\d/.test(color)) {
      colorErr.textContent = "Enter a color.";
      colorField.style.border = "2px solid red";
      isValid = false;
    } else {
      colorField.style.border = "2px solid green";
    }
  
    // Image validation
    if (!image) {
      imageErr.textContent = "Please upload an image.";
      imageField.style.border = "2px solid red";
      isValid = false;
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSizeMB = 2;
  
      if (!validTypes.includes(image.type)) {
        imageErr.textContent = "Only JPG, PNG, or GIF files are allowed.";
        imageField.style.border = "2px solid red";
        isValid = false;
      } else if (image.size > maxSizeMB * 1024 * 1024) {
        imageErr.textContent = "Image must be less than 2MB.";
        imageField.style.border = "2px solid red";
        isValid = false;
      } else {
        imageField.style.border = "2px solid green";
      }
    }
  
    if (isValid) {
      alert("Product added successfully!");
     successMessage.style.display = "block"; 
  
    }
  
    return isValid;
  }
  