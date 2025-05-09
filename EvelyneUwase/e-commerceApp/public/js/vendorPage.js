document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("productForm");
  const successAlert = document.getElementById("successAlert");

  // Field configurations
  const fields = [
    {
      input: document.getElementById("productName"),
      validate: value => value.trim().length > 2
    },
    {
      input: document.getElementById("category"),
      validate: value => value.trim().length > 2
    },
    {
      input: document.getElementById("price"),
      validate: value => parseFloat(value) > 0
    },
    {
      input: document.getElementById("quantity"),
      validate: value => parseInt(value) > 0
    },
    {
      input: document.getElementById("color"),
      validate: value => value.trim().length > 2
    },
    {
      input: document.getElementById("image"),
      validate: value => value !== ""
    }
  ];

  // Real-time validation
  fields.forEach(({ input, validate }) => {
    const eventType = input.type === 'file' ? 'change' : 'input';
    input.addEventListener(eventType, () => {
      const errorMsg = input.nextElementSibling;
      updateFieldState(input, validate, errorMsg);
    });
  });

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate all fields
    fields.forEach(({ input, validate }) => {
      const errorMsg = input.nextElementSibling;
      if (!updateFieldState(input, validate, errorMsg)) {
        isValid = false;
      }
    });

    if (isValid) {
      try {
        const formData = new FormData(form);
        const response = await fetch('/addProduct', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          showSuccess();
          form.reset();
          fields.forEach(field => field.input.classList.remove("valid"));
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("Error submitting form. Please try again.");
      }
    }
  });

  // Helper functions
  function updateFieldState(input, validate, errorMsg) {
    const isValid = validate(input.value);
    input.classList.toggle("valid", isValid);
    input.classList.toggle("invalid", !isValid);
    errorMsg.style.display = isValid ? "none" : "block";
    return isValid;
  }

  function showSuccess() {
    successAlert.style.display = "flex";
    setTimeout(() => {
      successAlert.style.display = "none";
    }, 5000);
  }
});