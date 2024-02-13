//use strict syntax
"use strict";
// Employee class definition
class Employee {
  constructor(name, address, empId, designation) {
    this.name = name;
    this.address = address;
    this.empId = empId;
    this.designation = designation;
  }
}

// Array to store employee objects
const employeeList = [];

// Get references to HTML elements
const form = document.getElementById("employeeForm");
const employeeListContainer = document.getElementById("employeeList");
const modal = document.getElementById("editModal");
const closeButton = document.getElementById("closeButton");

// Event listener for form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();
  // Get values from form inputs
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const empId = document.getElementById("empId").value;
  const designation = document.getElementById("designation").value;

  // Create new employee object
  const newEmployee = new Employee(name, address, empId, designation);
  // Add employee to the list
  employeeList.push(newEmployee);
  // Render the updated employee list
  renderEmployeeList();
  // Reset the form
  form.reset();
});

// Function to render the employee list
function renderEmployeeList() {
  // Clear the existing content of the employee list container
  employeeListContainer.innerHTML = "";

  // Create table header row
  const headerRow =
    '<tr><th>Name</th><th>Address</th><th>Employee ID</th><th>Designation</th><th colspan="2">Actions</th></tr>';

  // Create table body rows for each employee
  const bodyRows = employeeList
    .map((employee, index) => {
      return `<tr>
              <td>${employee.name}</td>
              <td>${employee.address}</td>
              <td>${employee.empId}</td>
              <td>${employee.designation}</td>
              <td><button class="edit" onclick="openEditModal(${index})">Edit</button></td>
              <td><button class="delete" onclick="deleteEmployee(${index})">Delete</button></td>
            </tr>`;
    })
    .join("");

  // Combine header row and body rows to form complete table
  const tableHtml = `<table align="center" id="employeeList">${headerRow}${bodyRows}</table>`;

  // Insert the table into the container
  employeeListContainer.innerHTML = tableHtml;
}

// Function to open edit modal for a specific employee
function openEditModal(index) {
  const employee = employeeList[index];
  // Fill edit form fields with employee details
  document.getElementById("editName").value = employee.name;
  document.getElementById("editAddress").value = employee.address;
  document.getElementById("editEmpId").value = employee.empId;
  document.getElementById("editDesignation").value = employee.designation;
  // Show edit modal
  modal.style.display = "block";
  // Store the index of the employee being edited
  window.currentIndex = index;
}

// Event listener for close button in edit modal
closeButton.addEventListener("click", function () {
  modal.style.display = "none"; // Hide edit modal
});

// Event listener to close modal when clicked outside of it
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none"; // Hide edit modal
  }
});

// Function to save changes in employee details
function saveChanges() {
  const index = window.currentIndex;
  const newName = document.getElementById("editName").value;
  const newAddress = document.getElementById("editAddress").value;
  const newEmpId = document.getElementById("editEmpId").value;
  const newDesignation = document.getElementById("editDesignation").value;

  // Update employee details if all fields are not empty
  if (newName && newAddress && newEmpId && newDesignation) {
    employeeList[index].name = newName;
    employeeList[index].address = newAddress;
    employeeList[index].empId = newEmpId;
    employeeList[index].designation = newDesignation;
    modal.style.display = "none"; // Hide edit modal
    renderEmployeeList(); // Render updated employee list
  }
}

// Function to delete an employee
function deleteEmployee(index) {
  employeeList.splice(index, 1); // Remove employee from the list
  renderEmployeeList(); // Render updated employee list
}
