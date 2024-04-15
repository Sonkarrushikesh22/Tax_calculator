let id = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let income = id("income"),
  extraIncome = id("extraIncome"),
  deductions = id("deductions"),
  age = id("age"),
  form = id("form"),
  errorMsg = classes("error"),
  successIcon = classes("success-icon"),
  failureIcon = classes("failure-icon");
  tooltip= classes("tooltip")[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let incomeValid = engine(income, 0, "Income cannot be blank", "Income must be a number");
  let extraIncomeValid = engine(extraIncome, 1, "Extra Income cannot be blank", "Extra Income must be a number");
  let deductionsValid = engine(deductions, 2, "Deductions cannot be blank", "Deductions must be a number");
  let ageValid = engine(age, 3, "Age cannot be blank", "Age must be a number");

  if (incomeValid && extraIncomeValid && deductionsValid && ageValid) {
    const tax = calculateTax(
      parseFloat(income.value),
      parseFloat(extraIncome.value),
      parseFloat(deductions.value),
      parseFloat(age.value)
    );
    showModal(tax);
  }
});

let engine = (id, serial, blankMessage, invalidMessage) => {
    if (id.value.trim() === "") {
      // Display error message
      id.setAttribute("data-tooltip", blankMessage);
      id.style.border = "2px solid red";
  
      // icons
      failureIcon[serial].style.opacity = "1";
      successIcon[serial].style.opacity = "0";
      return false;
    } else if (isNaN(id.value)) {
      // Display error message
      id.setAttribute("data-tooltip", invalidMessage);
      id.style.border = "2px solid red";
  
      // icons
      failureIcon[serial].style.opacity = "1";
      successIcon[serial].style.opacity = "0";
      return false;
    } else {
      // Clear error message
      id.removeAttribute("data-tooltip");
      id.style.border = "2px solid green";
  
      // icons
      failureIcon[serial].style.opacity = "0";
      successIcon[serial].style.opacity = "1";
      return true;
    }
  };
  

function calculateTax(income, extraIncome, deductions, age) {
  var totalIncome = income + extraIncome - deductions;
  var taxableAmount = Math.max(totalIncome - 800000, 0);
  var taxRate;
  if (age < 40) {
    taxRate = 0.3;
  } else if (age >= 40 && age <= 60) {
    taxRate = 0.4;
  } else {
    taxRate = 0.1;
  }
  return taxableAmount * taxRate;
}

function showModal(tax) {
    var modal = document.getElementById("myModal");
    var taxSpan = document.getElementById("taxAmount");
    taxSpan.textContent = tax.toFixed(2);
    modal.style.display = "flex"; // Display the modal
  }
  
  // Close the modal when the close button is clicked
  document.querySelector(".modal-close").addEventListener("click", function() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  });
  
  // Close the modal when clicking outside of it
  window.addEventListener("click", function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
// Add tooltip functionality

  