import {
  customer,
  allCustomers,
  allBookings,
  allRooms,
  hotel, 
  validateUserCredentials,
  getAllData,
  determineUserTabEvent,
  determineBookingTime
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
      domUpdates.removeClass([customerCurrentBookingsButton], 'button-tab-clicked');
      domUpdates.populateDashBoardInnerHTML();
      customer.getCustomerBookings(allBookings);
      customer.getTotalCustomerAmountSpent(allRooms);
      domUpdates.populateRightColumnWithChartHead(customer.bookings);
      domUpdates.populateRightColumnWithTotalCost();
    } else {
      domUpdates.removeClass([customerBillingInfoButton], 'button-tab-clicked');
      domUpdates.resetDashboard();
    }
  },

  displayCustomerBookings() {
    if (!customerCurrentBookingsButton.classList.contains('button-tab-clicked')) {
      domUpdates.addClass([customerCurrentBookingsButton], 'button-tab-clicked')
      domUpdates.removeClass([customerBillingInfoButton], 'button-tab-clicked');
      domUpdates.populateDashBoardInnerHTML();
      customer.getCustomerBookings(allBookings);
      domUpdates.populateCenterWithButtons(customer.bookings);
    } else {
      domUpdates.removeClass([customerCurrentBookingsButton], 'button-tab-clicked');
      domUpdates.resetDashboard();
    }
  },

  populateRightColumnWithLargeDisplay(selectedBooking) {
    let selectedRoom = hotel.rooms.find(room => room.number === selectedBooking.roomNumber);
    let roomType = selectedRoom.roomType.charAt(0).toUpperCase() + selectedRoom.roomType.slice(1);
    let bedSize = selectedRoom.bedSize.charAt(0).toUpperCase() + selectedRoom.bedSize.slice(1);
    dashboardRightColumn.innerHTML = `
    <h2 class="customer-single-booking-title">Room ${selectedRoom.number}: ${roomType}</h2>
    <section class="customer-single-booking-info">
      <h3>Features: ${selectedRoom.numBeds} ${bedSize}</h3>
      <h3>Has Bidet: ${selectedRoom.bidet}</h3>
      <h3>Price: $${selectedRoom.costPerNight}</h3>
    </section>
    <section class="customer-single-booking-submit" id="singleBookingSubmitBox">
    </section>
    `;
    domUpdates.determineIfBookButtonIsNeeded();
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
    let sortedBookingsData = bookingsData.sort((a, b) => new Date(a.date) - new Date(b.date));
    sortedBookingsData.forEach(booking => {
      let bookedRoom = hotel.rooms.find(room => room.number === booking.roomNumber);
      let itinerary = determineBookingTime(booking);
      let roomType = bookedRoom.roomType.charAt(0).toUpperCase() + bookedRoom.roomType.slice(1);
      dashboardCenterColumn.innerHTML += `
        <button class="customer-small-room-info display-booking slip-in" id="${booking.roomNumber}">
          <div class="small-room-info-left display-booking" id="${booking.roomNumber}">
            <p class="display-booking" id="${booking.roomNumber}">${itinerary}</p>
            <p class="display-booking" id="${booking.roomNumber}">${booking.date}</p>
          </div>
          <div class="small-room-info-right display-booking" id="${booking.roomNumber}">
            <p class="display-booking" id="${booking.roomNumber}">${roomType}</p>
            <p class="display-booking" id="${booking.roomNumber}">$${bookedRoom.costPerNight}</p>
          </div>
        </button>
      `;
    });
  },

  determineIfBookButtonIsNeeded() {
    let singleBookingSubmitBox = document.getElementById('singleBookingSubmitBox');
    if (customerNewBookingsButton.classList.contains('button-tab-clicked')) {
      singleBookingSubmitBox.innerHTML += `
      <button class="customer-book-room-button">BOOK ROOM</button>
      <p id="successfulBookingMessage"></p>
      `
    }
  },

  determineCenterColumnEvent(event) {
    if (event.target.classList.contains('display-booking')) {
      let selectedBooking = allBookings.find(booking => booking.roomNumber === parseInt(event.target.id));
      domUpdates.populateRightColumnWithLargeDisplay(selectedBooking);
    }
  },

  populateLeftColumnWithCalendar() {
    dashboardLeftColumn.innerHTML = `
    <section class="customer-date-input-wrapper">
      <label for="customerDateInput">Pick a date:</label>
      <input class="customer-date-input" id="customerDateInput" type="date" min="2022-01-01" max="2025-12-31">
      <label for="customerTypeInput">Pick a room type:</label>
      <input class="customer-date-input" id="customerTypeInput">
      <button class="customer-date-search-button" id="customerDateInputSubmitButton">Search Rooms</button>
    </section>
    `;
  },

  populateRightColumnWithTotalCost() {
    dashboardRightColumn.innerHTML = `
    <h2 class="total-bill-headline">Your total bill for all bookings, past and present at the Overlook Hotel is:</h2>
    <h3 class="total-bill-amount">$${customer.totalSpent.toFixed(2)}</h3>
    <div>
      <p class="total-bill-message">Thank you for your patronage.</p>
      <p class="total-bill-message">We look forward to seeing you again soon!</p>
    </div>
    `;
  },

  populateRightColumnWithChartHead(bookingsData) {  
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
  determineUserTabEvent(e);
});
customerDashboard.addEventListener('click', (e) => {
  domUpdates.determineCenterColumnEvent(e);
});

export { 
  domUpdates, 
  querySelectors
};

