import {
  customer,
  allCustomers,
  allBookings,
  allRooms, 
  validateUserCredentials,
  getAllData
} from "./scripts";

const loginButton = document.getElementById('loginButton');
const loginDisplay = document.getElementById('loginDisplay');
const customerDisplay = document.getElementById('customerDisplay');
const loginErrorMessage = document.getElementById('loginErrorMessage');
const customerInfo = document.getElementById('customerInfo');
const navUserInfo = document.getElementById('navUserInfo');
const usernameDisplay = document.getElementById('usernameDisplay');
const userIdDisplay = document.getElementById('userIdDisplay');

const domUpdates = {
  removeClass(elements, rule) {
    elements.forEach(item => item.classList.remove(rule));
  },

  addClass(elements, rule) {
    elements.forEach(item => item.classList.add(rule));
  },

  updateInnerText(element, update) {
    element.innerText = update;
  },

  showUserDashboard() {
    domUpdates.addClass([loginDisplay], 'hidden');
    domUpdates.removeClass([customerDisplay], 'hidden');
    console.log(customer)
  },

  showUserInfo() {
    console.log(customer)
    domUpdates.removeClass([navUserInfo], 'hidden');
    domUpdates.updateInnerText(usernameDisplay, `Username: ${customer.name}`);
    domUpdates.updateInnerText(userIdDisplay, `User ID: ${customer.id}`);
  }
};

const querySelectors = {
  loginErrorMessage,
  customerInfo
};

loginButton.addEventListener('click', validateUserCredentials);


export { 
  domUpdates, 
  querySelectors 
};

