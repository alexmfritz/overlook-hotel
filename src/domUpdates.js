import { 
  validateUserCredentials,
  getAllData
} from "./scripts";

const loginButton = document.getElementById('loginButton');
const loginDisplay = document.getElementById('loginDisplay');
const customerDisplay = document.getElementById('customerDisplay');
const loginErrorMessage = document.getElementById('loginErrorMessage');
const customerInfo = document.getElementById('customerInfo');

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

