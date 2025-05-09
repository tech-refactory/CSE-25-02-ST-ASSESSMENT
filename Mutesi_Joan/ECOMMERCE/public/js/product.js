// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("productForm");
//   const successAlert = document.getElementById("successAlert");

//   const fields = [
//     {
//       input: document.getElementById("productName"),
//       validate: (value) => value.trim().length > 2,
//     },
//     {
//       input: document.getElementById("category"),
//       validate: (value) => value.trim().length > 2,
//     },
//     {
//       input: document.getElementById("price"),
//       validate: (value) => parseFloat(value) > 0,
//     },
//     {
//       input: document.getElementById("quantity"),
//       validate: (value) => parseInt(value) > 0,
//     },
//     {
//       input: document.getElementById("color"),
//       validate: (value) => value.trim().length > 2,
//     },
//     {
//       input: document.getElementById("image"),
//       validate: (value) => value !== "", // Changed for file input
//     },
//   ];

//   // Validation on input
//   fields.forEach(({ input, validate }) => {
//     input.addEventListener("input", () => {
//       const errorMsg = input.nextElementSibling;
//       validateField(input, validate, errorMsg);
//     });
//   });

//   // For file input, we need to listen for change event
//   document.getElementById("image").addEventListener("change", function() {
//     const errorMsg = this.nextElementSibling;
//     validateField(this, fields[5].validate, errorMsg);
//   });

//   form.addEventListener("submit", async function (e) {
//     e.preventDefault();
//     let isFormValid = true;

//     // Validate all fields
//     fields.forEach(({ input, validate }) => {
//       const errorMsg = input.nextElementSibling;
//       if (!validate(input.value)) {
//         input.classList.add("invalid");
//         input.classList.remove("valid");
//         errorMsg.style.display = "block";
//         isFormValid = false;
//       } else {
//         input.classList.remove("invalid");
//         input.classList.add("valid");
//         errorMsg.style.display = "none";
//       }
//     });

//     if (isFormValid) {
//       try {
//         // Create FormData object to handle file upload
//         const formData = new FormData(form);
        
//         // Send data to server
//         const response = await fetch('/addProduct', {
//           method: 'POST',
//           body: formData,
//           // Don't set Content-Type header when using FormData
//           // The browser will set it automatically with the correct boundary
//         });

//         if (response.ok) {
//           // Show success message
//           successAlert.style.display = "flex";
//           form.reset();
          
//           // Remove valid styles after submission
//           fields.forEach(({ input }) => input.classList.remove("valid"));
          
//           // Optionally refresh the product list
//           // You might want to add this after implementing the server-side
//           // window.location.reload();
//         } else {
//           throw new Error('Server responded with an error');
//         }
//       } catch (error) {
//         console.error('Error submitting form:', error);
//         alert('There was an error submitting the form. Please try again.');
//       }
//     }
//   });

//   // Helper function for validation
//   function validateField(input, validate, errorMsg) {
//     if (validate(input.value)) {
//       input.classList.remove("invalid");
//       input.classList.add("valid");
//       errorMsg.style.display = "none";
//     } else {
//       input.classList.remove("valid");
//       input.classList.add("invalid");
//       errorMsg.style.display = "block";
//     }
//   }
// });


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