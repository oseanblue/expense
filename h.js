function addExpense() {
  // Get values from the form
  var description = document.getElementById("description").value;
  var amount = document.getElementById("amount").value;
  var type = document.getElementById("type").value;
  
  // Validate the form
  if (description === "") {
    alert("Please enter a description.");
    return;
  }
  if (amount === "") {
    alert("Please enter an amount.");
    return;
  }
  if (type === "") {
    alert("Please select a type.");
    return;
  }
  
  // Add the expense to the list
  var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push({ description: description, amount: amount, type: type });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  
  // Clear the form
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("type").value = "";
  
  // Update the table
  updateTable();
}

function updateTable() {
  var table = document.getElementById("expense-table");
  table.innerHTML = "";
  
  var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  for (var i = 0; i < expenses.length; i++) {
    var row = table.insertRow(-1);
    var descriptionCell = row.insertCell(0);
    var amountCell = row.insertCell(1);
    var typeCell = row.insertCell(2);
    var actionsCell = row.insertCell(3);
    
    descriptionCell.innerHTML = expenses[i].description;
    amountCell.innerHTML = expenses[i].amount;
    typeCell.innerHTML = expenses[i].type;
    actionsCell.innerHTML = `
      <button type="button" class="btn btn-outline-success" onclick="editExpense(${i})">Edit</button>
      <button type="button" class="btn btn-outline-danger" onclick="deleteExpense(${i})">Delete</button>
    `;
  }
}
function editExpense(index) {
  // Get the expense from the list
  var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  var expense = expenses[index];
  
  // Create the input elements for in-place editing
  var descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.value = expense.description;
  var amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.value = expense.amount;
  var typeInput = document.createElement("input");
  typeInput.type = "text";
  typeInput.value = expense.type;
  
  // Create the save and cancel buttons
  var saveButton = document.createElement("button");
  saveButton.textContent = "SAVE";
  saveButton.className="btn btn-outline-info"
  saveButton.onclick = () => {
    // Update the expense in the list
    expenses[index] = {
      description: descriptionInput.value,
      amount: amountInput.value,
      type: typeInput.value
    };
    localStorage.setItem("expenses", JSON.stringify(expenses));
    
    // Update the table
    updateTable();
  };
  var cancelButton = document.createElement("button");
  cancelButton.textContent = "CANCEL";
  cancelButton.className="btn btn-outline-warning"
  cancelButton.onclick = () => {
    // Update the table
    updateTable();
  };
  
  // Update the table cells with the input elements and buttons
  var table = document.getElementById("expense-table");
  var row = table.rows[index];
  row.cells[0].innerHTML = "";
  row.cells[0].appendChild(descriptionInput);
  row.cells[1].innerHTML = "";
  row.cells[1].appendChild(amountInput);
  row.cells[2].innerHTML = "";
  row.cells[2].appendChild(typeInput);
  row.cells[3].innerHTML = "";
  row.cells[3].appendChild(saveButton);
  row.cells[3].appendChild(cancelButton);
}



function deleteExpense(index) {
  return new Promise((resolve, reject) => {
  // Remove the expense from the list
  var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  
  // Update the table
  updateTable();
  
  resolve();
});
}

// Update the table when the page loads
updateTable();


