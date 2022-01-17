import {
  hotel, 
  validateUserCredentials,
  determineUserTabEvent,
  determineBookingTime,
  completeCustomerBooking,
  getTodaysDate
} from "./scripts";
import Room from './classes/Room';
import Booking from './classes/Booking';
const loginButton = document.getElementById('loginButton');
const loginDisplay = document.getElementById('loginDisplay');
const customerDisplay = document.getElementById('customerDisplay');
const loginErrorMessage = document.getElementById('loginErrorMessage');
const customerDashboard = document.getElementById('customerDashboard');
const navUserInfo = document.getElementById('navUserInfo');
const usernameDisplay = document.getElementById('usernameDisplay');
const userIdDisplay = document.getElementById('userIdDisplay');
const customerNewBookingsButton = document.getElementById('customerNewBookingsButton');
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
    domUpdates.updateInnerText(usernameDisplay, `Username: ${hotel.currentCustomer.name}`);
    domUpdates.updateInnerText(userIdDisplay, `User ID: ${hotel.currentCustomer.id}`);
  },

  toggleBillingButton() {
    domUpdates.addClass([customerBillingInfoButton], 'button-tab-clicked');
    domUpdates.removeClass([customerCurrentBookingsButton, customerNewBookingsButton], 'button-tab-clicked');
  },

  toggleBookingsButton() {
    domUpdates.addClass([customerCurrentBookingsButton], 'button-tab-clicked')
    domUpdates.removeClass([customerBillingInfoButton, customerNewBookingsButton], 'button-tab-clicked');
  },

  toggleBookRoomsButton() {
    domUpdates.addClass([customerNewBookingsButton], 'button-tab-clicked')
    domUpdates.removeClass([customerBillingInfoButton, customerCurrentBookingsButton], 'button-tab-clicked');
  },

  invalidLoginMessage() {
    domUpdates.updateInnerText(querySelectors.loginErrorMessage, "Please enter the correct credentials!");
    setTimeout(() => {
      domUpdates.updateInnerText(querySelectors.loginErrorMessage, "");
    }, 1500);
  },

  displayCustomerTotalCost() {
    if (!customerBillingInfoButton.classList.contains('button-tab-clicked')) {
      domUpdates.toggleBillingButton();
      domUpdates.populateDashBoardInnerHTML();
      hotel.currentCustomer.getCustomerBookings(hotel.bookings);
      hotel.currentCustomer.getTotalCustomerAmountSpent(hotel.rooms);
      domUpdates.populateRightColumnWithChartHead(hotel.currentCustomer.bookings);
      domUpdates.populateRightColumnWithTotalCost();
    } else {
      domUpdates.removeClass([customerBillingInfoButton], 'button-tab-clicked');
      domUpdates.resetDashboard();
    }
  },

  displayCustomerBookings() {
    if (!customerCurrentBookingsButton.classList.contains('button-tab-clicked')) {
      domUpdates.toggleBookingsButton();
      domUpdates.populateDashBoardInnerHTML();
      hotel.currentCustomer.getCustomerBookings(hotel.bookings);
      domUpdates.displayCenterWithBookingsButtons(hotel.currentCustomer.bookings);
    } else {
      domUpdates.removeClass([customerCurrentBookingsButton], 'button-tab-clicked');
      domUpdates.resetDashboard();
    }
  },

  displayBookNewRooms() {
    if (!customerNewBookingsButton.classList.contains('button-tab-clicked')) {
      domUpdates.toggleBookRoomsButton();
      domUpdates.populateDashBoardInnerHTML();
      domUpdates.populateLeftColumnWithCalendar();
      domUpdates.displayCenterWithRoomsButtons(hotel.rooms);
    } else {
      domUpdates.removeClass([customerNewBookingsButton], 'button-tab-clicked');
      domUpdates.resetDashboard();
    }
  },

  populateRightColumnWithLargeDisplay(selection) {
    if (selection instanceof Booking) {
      domUpdates.populateRightColumnWithBookingInfo(selection);
    } else if (selection instanceof Room) {
      domUpdates.displayRightColumnWithRoomInfo(selection);
    }
  },

  populateRightColumnWithBookingInfo(selection) {
    let selectedRoom = hotel.rooms.find(room => room.number === selection.roomNumber);
    let roomType = selectedRoom.roomType.charAt(0).toUpperCase() + selectedRoom.roomType.slice(1);
    let bedSize = selectedRoom.bedSize.charAt(0).toUpperCase() + selectedRoom.bedSize.slice(1);
    dashboardRightColumn.innerHTML = `
    <h2 class="customer-single-booking-title">Room ${selectedRoom.number}: ${roomType}</h2>
    <section class="customer-single-booking-info">
      <h3>Features: ${selectedRoom.numBeds} ${bedSize}</h3>
      <h3>Has Bidet: ${selectedRoom.bidet}</h3>
      <h3>Price: $${selectedRoom.costPerNight}/night</h3>
    </section>
    `;
  },

  displayRightColumnWithRoomInfo(selection) {
    let roomType = selection.roomType.charAt(0).toUpperCase() + selection.roomType.slice(1);
    let bedSize = selection.bedSize.charAt(0).toUpperCase() + selection.bedSize.slice(1);
    domUpdates.populateRightColumnWithRoomInfo(selection, roomType, bedSize);
    domUpdates.determineIfBookButtonIsNeeded(selection);
  },

  populateRightColumnWithRoomInfo(selection, roomType, bedSize) {
    dashboardRightColumn.innerHTML = `
    <h2 class="customer-single-booking-title">Room ${selection.number}: ${roomType}</h2>
    <section class="customer-single-booking-info">
      <h3>Features: ${selection.numBeds} ${bedSize}</h3>
      <h3>Has Bidet: ${selection.bidet}</h3>
      <h3>Price: $${selection.costPerNight}/night</h3>
    </section>
    <section class="customer-single-booking-submit" id="singleBookingSubmitBox">
    </section>
    `;
  },

  determineIfBookButtonIsNeeded(selection) {
    let singleBookingSubmitBox = document.getElementById('singleBookingSubmitBox');
    let customerDateInput = document.getElementById('customerDateInput');
    if (customerDateInput.value) {
      domUpdates.populateBookingButton(singleBookingSubmitBox, selection);
    }
  },

  populateBookingButton(element, selection) {
    element.innerHTML = `
    <button class="customer-book-room-button" id=${selection.number}>BOOK ROOM</button>
    <p id="successfulBookingMessage"></p>
    `;
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

  displayCenterWithBookingsButtons(bookingsData) {
    let sortedBookingsData = bookingsData.sort((a, b) => new Date(a.date) - new Date(b.date));
    sortedBookingsData.forEach(booking => {
      let bookedRoom = hotel.rooms.find(room => room.number === booking.roomNumber);
      let itinerary = determineBookingTime(booking);
      let roomType = bookedRoom.roomType.charAt(0).toUpperCase() + bookedRoom.roomType.slice(1);
      domUpdates.populateCenterWithBookingsButtons(booking, bookedRoom, itinerary, roomType);
    });
  },

  populateCenterWithBookingsButtons(booking, bookedRoom, itinerary, roomType) {
    dashboardCenterColumn.innerHTML += `
        <button class="customer-small-room-info display-booking" id="${booking.roomNumber}">
          <div class="small-room-info-left display-booking" id="${booking.roomNumber}">
            <p class="display-booking" id="${booking.roomNumber}">${itinerary}</p>
            <p class="display-booking" id="${booking.roomNumber}">${booking.date}</p>
          </div>
          <div class="small-room-info-right display-booking" id="${booking.roomNumber}">
            <p class="display-booking" id="${booking.roomNumber}">${roomType}</p>
            <p class="display-booking" id="${booking.roomNumber}">$${bookedRoom.costPerNight}/night</p>
          </div>
        </button>
      `;
  },

  displayCenterWithRoomsButtons(rooms) {
    if (!rooms.length) {
      domUpdates.populateApologyMessage();
    } else {
      domUpdates.populateCenterWithRoomButtons(rooms);
    }
  },

  populateApologyMessage() {
    dashboardCenterColumn.innerHTML = `
      <h2>We are so, so, so, so, SO SORRY there are no rooms available for this date!</h2>
      `;
  },

  populateCenterWithRoomButtons(rooms) {
    dashboardCenterColumn.innerHTML = '';
      rooms.forEach(room => {
        let roomType = room.roomType.charAt(0).toUpperCase() + room.roomType.slice(1);
        dashboardCenterColumn.innerHTML += `
        <button class="customer-small-room-info display-room" id=${room.number}>
          <section class="small-room-info display-room" id=${room.number}> 
            <p class="display-room" id=${room.number}>Room ${room.number}</p>
            <p class="display-room" id=${room.number}>${roomType}</p>
            <p class="display-room" id=${room.number}>$${room.costPerNight}/night</p>
          </section>
        </button>
        `
      });
  },

  determineFilteringNewBookingsEvent(event) {
    if (event.target.id === 'customerDateInputSubmitButton') {
      domUpdates.filterByCalendarDateInput();
    } else if (event.target.id === 'customerTypeInputSubmitButton') {
      domUpdates.filterByRoomTypeInput();
    } else if (event.target.id === 'customerClearInputSearchButton') {
      domUpdates.clearRoomSearchFilters();
    }
  },

  clearRoomSearchFilters() {
    let customerDateInput = document.getElementById('customerDateInput');
    customerDateInput.value = '';
    hotel.availableRooms = [];
    domUpdates.displayCenterWithRoomsButtons(hotel.rooms);
    domUpdates.resetRightColumn();
  },

  determineColumnEvents(event) {
    if (event.target.classList.contains('customer-date-search-button')) {
      domUpdates.determineFilteringNewBookingsEvent(event);
    } else if (event.target.classList.contains('display-booking')) {
      let selectedBooking = hotel.bookings.find(booking => booking.roomNumber === parseInt(event.target.id));
      domUpdates.populateRightColumnWithLargeDisplay(selectedBooking);
    } else if (event.target.classList.contains('display-room')) {
      let selectedRoom = hotel.rooms.find(room => room.number === parseInt(event.target.id));
      domUpdates.populateRightColumnWithLargeDisplay(selectedRoom);
    } else if (event.target.classList.contains('customer-book-room-button')) {
      let selectedRoom = hotel.rooms.find(room => room.number === parseInt(event.target.id));
      let customerDateInput = document.getElementById('customerDateInput');
      let date = customerDateInput.value.replaceAll('-', '/');
      completeCustomerBooking(date, selectedRoom.number, event)
    }
  },

  informCustomerOfBookedRoom(event) {
    if (event.target.classList.contains('customer-book-room-button')) {
      domUpdates.addClass([event.target], 'hidden');
      let successMessage = document.getElementById('successfulBookingMessage');
      successMessage.innerText = "Your room has been booked!";
    }
  },

  filterByCalendarDateInput() {
    hotel.availableRooms = [];
    let customerDateInput = document.getElementById('customerDateInput');
    let date = customerDateInput.value.replaceAll('-', '/');
    let today = getTodaysDate();
    if (date < today) {
      domUpdates.invalidDateMessage();
      customerDateInput.value = '';
    } else {
      hotel.filterAllAvailableRooms(date);
      domUpdates.displayCenterWithRoomsButtons(hotel.availableRooms);
      domUpdates.resetRightColumn();
    }
  },

  invalidDateMessage() {
    dashboardCenterColumn.innerHTML = `
      <p>Please select a valid date for booking!</p>
    `;
  },

  filterByRoomTypeInput() {
    let customerRoomyTypeInput = document.getElementById('customerTypeInput');
    let roomType = customerRoomyTypeInput.value.toLowerCase();
    hotel.filterRoomByType(roomType);
    domUpdates.displayCenterWithRoomsButtons(hotel.availableRooms);
    domUpdates.resetRightColumn();
    customerRoomyTypeInput.value = '';
  },

  resetRightColumn() {
    dashboardRightColumn.innerHTML = '';
  },

  populateLeftColumnWithCalendar() {
    dashboardLeftColumn.innerHTML = `
    <section class="customer-date-input-wrapper">
      <label for="customerDateInput">Pick a date:</label>
      <input class="customer-date-input" id="customerDateInput" type="date">
      <button class="customer-date-search-button" id="customerDateInputSubmitButton">Search Room By Date</button>
      <label for="customerTypeInput">Pick a room type:</label>
      <input class="customer-date-input" id="customerTypeInput" placeholder="ex: single room">
      <button class="customer-date-search-button" id="customerTypeInputSubmitButton">Search Rooms</button>
      <button class="customer-date-search-button" id="customerClearInputSearchButton" id="customerClearInputSubmitButton">Clear Search</button>
    </section>
    `;
    let customerDateInput = document.getElementById('customerDateInput');
    customerDateInput.min = getTodaysDate().replaceAll('/', '-');
  },

  populateRightColumnWithTotalCost() {
    dashboardRightColumn.innerHTML = `
    <h2 class="total-bill-headline">Your total bill for all bookings, past and present at the Overlook Hotel is:</h2>
    <h3 class="total-bill-amount">$${hotel.currentCustomer.totalSpent.toFixed(2)}</h3>
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
    domUpdates.displayTotalCostChart(bookingsData, totalCostTableBody);
  },

  displayTotalCostChart(bookingsData, tableBody) {
    let sortedBookingsData = bookingsData.sort((a, b) => new Date(a.date) - new Date(b.date));
    sortedBookingsData.forEach(booking => {
      let bookedRoom = hotel.rooms.find(room => room.number === booking.roomNumber);
      let roomType = bookedRoom.roomType.charAt(0).toUpperCase() + bookedRoom.roomType.slice(1);
      domUpdates.populateTotalCostChart(tableBody, roomType, booking, bookedRoom);
    });
  },

  populateTotalCostChart(tableBody, roomType, booking, bookedRoom) {
    tableBody.innerHTML += `
      <tr>
        <td>${roomType}</td>
        <td>${booking.date}</td>
        <td>$${bookedRoom.costPerNight}</td>
      </tr>
      `;
  }
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
  domUpdates.determineColumnEvents(e);
});

export { 
  domUpdates, 
  querySelectors
};

