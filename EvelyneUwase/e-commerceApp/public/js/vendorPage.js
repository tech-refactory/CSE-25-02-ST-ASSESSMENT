document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("productForm");
  const successAlert = document.getElementById("successAlert");

  const fields = [
    {
      input: document.getElementById("productName"),
      validate: (value) => value.trim().length > 2,
    },
    {
      input: document.getElementById("category"),
      validate: (value) => value.trim().length > 2,
    },
    {
      input: document.getElementById("price"),
      validate: (value) => parseFloat(value) > 0,
    },
    {
      input: document.getElementById("quantity"),
      validate: (value) => parseInt(value) > 0,
    },
    {
      input: document.getElementById("color"),
      validate: (value) => value.trim().length > 2,
    },
    {
      input: document.getElementById("image"),
      validate: (value) => value.trim() !== "",
    },
  ];

  fields.forEach(({ input, validate }) => {
    input.addEventListener("input", () => {
      const errorMsg = input.nextElementSibling;
      if (validate(input.value)) {
        input.classList.remove("invalid");
        input.classList.add("valid");
        errorMsg.style.display = "none";
      } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
        errorMsg.style.display = "block";
      }
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isFormValid = true;

    fields.forEach(({ input, validate }) => {
      const errorMsg = input.nextElementSibling;
      if (!validate(input.value)) {
        input.classList.add("invalid");
        input.classList.remove("valid");
        errorMsg.style.display = "block";
        isFormValid = false;
      } else {
        input.classList.remove("invalid");
        input.classList.add("valid");
        errorMsg.style.display = "none";
      }
    });

    if (isFormValid) {
      successAlert.style.display = "flex";
      form.reset();

      // Remove valid styles after submission
      fields.forEach(({ input }) => input.classList.remove("valid"));
    }
  });
});
