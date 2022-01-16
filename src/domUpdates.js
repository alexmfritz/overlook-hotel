import {
  customer,
  allCustomers,
  allBookings,
  allRooms,
  hotel, 
  validateUserCredentials,
  getAllData,
  determineUserEvent
} from "./scripts";

const loginButton = document.getElementById('loginButton');
const loginDisplay = document.getElementById('loginDisplay');
const customerDisplay = document.getElementById('customerDisplay');
const loginErrorMessage = document.getElementById('loginErrorMessage');
const customerDashboard = document.getElementById('customerDashboard');
const navUserInfo = document.getElementById('navUserInfo');
const usernameDisplay = document.getElementById('usernameDisplay');
const userIdDisplay = document.getElementById('userIdDisplay');
const customerNewBookingsButton = document.getElementsByName('customerNewBookingsButton');
const customerCurrentBookingsButton = document.getElementById('customerCurrentBookingsButton');
const customerBillingInfoButton = document.getElementById('customerBillingInfoButton');
let dashboardLeftColumn;
let dashboardCenterColumn;
let dashboardRightColumn;
let totalCostTableBody;

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
  },

  showUserInfo() {
    domUpdates.removeClass([navUserInfo], 'hidden');
    domUpdates.updateInnerText(usernameDisplay, `Username: ${customer.name}`);
    domUpdates.updateInnerText(userIdDisplay, `User ID: ${customer.id}`);
  },

  invalidLoginMessage() {
    domUpdates.updateInnerText(querySelectors.loginErrorMessage, "Please enter the correct credentials!");
    setTimeout(() => {
      domUpdates.updateInnerText(querySelectors.loginErrorMessage, "");
    }, 1500);
  },

  displayCustomerTotalCost() {
    if (!customerBillingInfoButton.classList.contains('button-tab-clicked')) {
      domUpdates.addClass([customerBillingInfoButton], 'button-tab-clicked');
      domUpdates.populateDashBoardInnerHTML();
      customer.getCustomerBookings(allBookings);
      customer.getTotalCustomerAmountSpent(allRooms);
      domUpdates.populateTotalCostChartHead(customer.bookings);
      domUpdates.populateTotalCostRightColumn();
    } else {
      domUpdates.removeClass([customerBillingInfoButton], 'button-tab-clicked');
      domUpdates.resetDashboard();
    }
  },

  displayCustomerBookings() {
    domUpdates.populateDashBoardInnerHTML();
    customer.getCustomerBookings(allBookings);
  },

  resetDashboard() {
    customerDashboard.innerHTML = `
    <h2 class="welcome-message" id="informationDisplay">Welcome to your Dashboard!</h2>
    `;
  },

  populateDashBoardInnerHTML() {
    customerDashboard.innerHTML = `
    <section class="customer-new-bookings-date" id="dashboardLeftColumn"></section>
    <section class="customer-new-bookings-wrapper" id="dashboardCenterColumn"></section>
    <section class="customer-new-bookings-wrapper right-column pop-in" id="dashboardRightColumn"></section>
    `;
    dashboardLeftColumn = document.getElementById('dashboardLeftColumn');
    dashboardCenterColumn = document.getElementById('dashboardCenterColumn');
    dashboardRightColumn = document.getElementById('dashboardRightColumn');
  },

  populateCenterWithButtons(bookingsData) {
    bookingsData.forEach(booking => {
      let bookedRoom = hotel.rooms.find(room => room.number === booking.roomNumber);
      dashboardCenterColumn.innerHTML += `
        <button class="customer-small-room-info">
          <div class="small-room-info-left">
            <p>Booking ID: ${booking.id}</p>
            <p>${bookedRoom.roomType}</p>
          </div>
          <div class="small-room-info-right">
            <p>${booking.date}</p>
            <p>$${bookedRoom.costPerNight}</p>
          </div>
        </button>
      `;
    });
  },

  populateTotalCostRightColumn() {
    dashboardRightColumn.innerHTML = `
    <h2 class="total-bill-headline">Your total bill for all bookings, past and present at the Overlook Hotel is:</h2>
    <h3 class="total-bill-amount">$${customer.totalSpent.toFixed(2)}</h3>
    <div>
      <p class="total-bill-message">Thank you for your patronage.</p>
      <p class="total-bill-message">We look forward to seeing you again soon!</p>
    </div>
    `;
  },

  populateTotalCostChartHead(bookingsData) {
    dashboardCenterColumn.innerHTML = `
    <table class="scrolling"> 
      <caption>Booking Costs</caption>
      <thead>
          <tr>
            <th><u>Room Type</u></th>
            <th><u>Booking Date</u></th>
            <th><u>Nightly Cost</u></th>
          </tr>
      </thead>
      <tbody id="totalCostTableBody">
      </tbody>
    </table>
    `;
    totalCostTableBody = document.getElementById('totalCostTableBody');
    domUpdates.populateTotalCostChart(bookingsData, totalCostTableBody);
  },

  populateTotalCostChart(bookingsData, tableBody) {
    let sortedBookingsData = bookingsData.sort((a, b) => new Date(a.date) - new Date(b.date));
    sortedBookingsData.forEach(booking => {
      let bookedRoom = hotel.rooms.find(room => room.number === booking.roomNumber);
      let roomType = bookedRoom.roomType.charAt(0).toUpperCase() + bookedRoom.roomType.slice(1);
      tableBody.innerHTML += `
      <tr>
        <td>${roomType}</td>
        <td>${booking.date}</td>
        <td>$${bookedRoom.costPerNight}</td>
      </tr>
      `;
    });
  },

};

const querySelectors = {
  loginErrorMessage,
  customerDashboard
};

loginButton.addEventListener('click', validateUserCredentials);
customerDisplay.addEventListener('click', (e) => {
  determineUserEvent(e);
})

export { 
  domUpdates, 
  querySelectors
};

