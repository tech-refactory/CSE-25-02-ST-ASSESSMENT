function validateform() {
  const name = document.getElementById("name").value.trim();
  const category = document.getElementById("category").value.trim();
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;
  const color = document.getElementById("color").value.trim();
  //const image = document.getElementById("image").value;

  const nameErr = document.getElementById("name-error");
  const categoryErr = document.getElementById("category-error");
  const priceErr = document.getElementById("price-error");
  const quantityErr = document.getElementById("quantity-error");
  const colorErr = document.getElementById("color-error");
  //const imageErr = document.getElementById("image-error");

  nameErr.textContent = "";
  categoryErr.textContent = "";
  priceErr.textContent = "";
  quantityErr.textContent = "";
  colorErr.textContent = "";
  //imageErr.textContent = "";

  let isValid = true;

  if (name === "" ) {
    nameErr.textContent = "Enter a valid product name.";
    isValid = false;
  }

  if (category === "" ||/\d/.test(category)) {
    categoryErr.textContent = "Enter a product category.";
    isValid = false;
  }

  if (price === "" || isNaN(price)) {
    priceErr.textContent = "Enter a valid price greater than 0.";
    isValid = false;
  }

  if (quantity === "" || isNaN(quantity)) {
    quantityErr.textContent = "Enter a valid quantity.";
    isValid = false;
  }

  if (color === "" || /\d/.test(color)) {
    colorErr.textContent = "Enter a color.";
    isValid = false;
  }

//   if (image === "") {
//     imageErr.textContent = "Please upload an image.";
//     isValid = false;
//   }

  if (isValid) {

    alert("Product added successfully!");
  }else{
    
  }

  return isValid;
}
