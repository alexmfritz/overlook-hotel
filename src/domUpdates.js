import {
  hotel, 
  validateUserCredentials,
  determineUserTabEvent,
  determineBookingTime,
  completeCustomerBooking,
  getTodaysDate,
  separator,
  sortDate
} from "./scripts";
import './images/residential-suite.png';
import './images/junior-suite.png';
import './images/suite.png';
import './images/single-room.png';
import { hotelPics } from './data/hotel-pics';
import Room from './classes/Room';
import Booking from './classes/Booking';
const loginPassword = document.getElementById('loginPassword');
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
    domUpdates.updateInnerText(usernameDisplay, `${hotel.currentCustomer.name}`);
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
    let selectedPic = hotelPics.find(hotelObj => hotelObj.roomType === selectedRoom.roomType)
    dashboardRightColumn.innerHTML = `
      <h2 class="customer-single-booking-title">Room ${selectedRoom.number}: ${roomType}</h2>
      <img class="room-image" src=${selectedPic.src} alt="${roomType} picture"/>
      <section class="customer-single-booking-info">
        <h3>Booking ID: ${selection.id.toUpperCase()}</h3>
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
    let bidet = selection.bidet ? 'yes' : 'no';
    let selectedPic = hotelPics.find(hotelObj => hotelObj.roomType === selection.roomType);
    dashboardRightColumn.innerHTML = `
      <h2 class="customer-single-booking-title">Room ${selection.number}: ${roomType}</h2>
      <img class="room-image" src=${selectedPic.src} alt="${roomType} picture"/>
      <section class="customer-single-booking-info">
        <h3>Features: ${selection.numBeds}x ${bedSize}</h3>
        <h3>Bidet: ${bidet}</h3>
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
      <section class="customer-new-bookings-wrapper right-column pop-in" id="dashboardRightColumn" tabindex="0"></section>
    `;
    dashboardLeftColumn = document.getElementById('dashboardLeftColumn');
    dashboardCenterColumn = document.getElementById('dashboardCenterColumn');
    dashboardRightColumn = document.getElementById('dashboardRightColumn');
  },

  displayCenterWithBookingsButtons(bookingsData) {
    let sortedBookingsData = bookingsData.sort((a, b) => new Date(a.date) - new Date(b.date));
    console.log(sortedBookingsData)
    sortedBookingsData.forEach(booking => {
      let bookedRoom = hotel.rooms.find(room => room.number === booking.roomNumber);
      let itinerary = determineBookingTime(booking);
      let roomType = bookedRoom.roomType.charAt(0).toUpperCase() + bookedRoom.roomType.slice(1);
      domUpdates.populateCenterWithBookingsButtons(booking, bookedRoom, itinerary, roomType);
    });
  },

  populateCenterWithBookingsButtons(booking, bookedRoom, itinerary, roomType) {
    let newDate = sortDate(booking.date);
    dashboardCenterColumn.innerHTML += `
      <section class="flip-card scale-in">
        <button class="flip-card-inner customer-small-room-info display-booking" id="${booking.roomNumber}">
          <div class="flip-card-front display-booking" id="${booking.roomNumber}">
            <h3 class="display-booking" id="${booking.roomNumber}">${itinerary}</h3>
            <h3 class="display-booking" id="${booking.roomNumber}">${newDate}</h3>
          </div>
          <div class=" flip-card-back display-booking" id="${booking.roomNumber}">
            <h3 class="display-booking" id="${booking.roomNumber}">${roomType}</h3>
            <h3 class="display-booking" id="${booking.roomNumber}">$${bookedRoom.costPerNight}/night</h3>
          </div>
        </button>
      </section>
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
          <button class="customer-small-room-info display-room scale-in heartbeat" id=${room.number}>
            <section class="small-room-info display-room" id=${room.number}> 
              <p class="display-room" id=${room.number}>Room ${room.number}</p>
              <p class="display-room" id=${room.number}>${roomType}</p>
              <p class="display-room" id=${room.number}>$${room.costPerNight}/night</p>
            </section>
          </button>
        `;
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
      completeCustomerBooking(date, selectedRoom.number, event);
      domUpdates.resetRoomDisplayAfterBooking();
    }
  },

  resetRoomDisplayAfterBooking() {
    setTimeout(() => {
      dashboardRightColumn.innerHTML = '';
    }, 3000)
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
    let date = sortDate(customerDateInput.value.replaceAll('-', '/'));
    let today = sortDate(getTodaysDate());
    if (today <= date) {
      hotel.filterAllAvailableRooms(customerDateInput.value.replaceAll('-', '/'));
      domUpdates.displayCenterWithRoomsButtons(hotel.availableRooms);
      domUpdates.resetRightColumn();
    } else {
      domUpdates.invalidDateMessage();
      customerDateInput.value = '';
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
      <div class="input-box">
        <label for="customerDateInput">Pick a date:</label>
        <input id="customerDateInput" type="date">
      </div>
      <button class="customer-date-search-button" id="customerDateInputSubmitButton">Search By Date</button>
      <div class="input-box">
        <label for="customerTypeInput">Pick a room:</label>
        <input id="customerTypeInput" placeholder="ex: single room">
      </div>
      <button class="customer-date-search-button" id="customerTypeInputSubmitButton">Search By Type</button>
      <div class="input-box">
        <button class="customer-date-search-button" id="customerClearInputSearchButton" id="customerClearInputSubmitButton">Clear Search</button>
      </div>
    `;
    let customerDateInput = document.getElementById('customerDateInput');
    let customerTypeInput = document.getElementById('customerDateInput');
    domUpdates.setCalendarDate(customerDateInput);
    domUpdates.createSearchEventListeners(customerDateInput, customerTypeInput);
  },

  createSearchEventListeners(customerDateInput, customerTypeInput) {
    domUpdates.createCalendarEventListener(customerDateInput);
    domUpdates.createRoomTypeInputEventListener(customerTypeInput);
  },

  createCalendarEventListener(customerDateInput) {
    customerDateInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        domUpdates.filterByCalendarDateInput();
      }
    })
  },

  createRoomTypeInputEventListener(customerTypeInput) {
    customerTypeInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        domUpdates.filterByRoomTypeInput();
      }
    })
  },

  setCalendarDate(customerDateInput) {
    customerDateInput.min = getTodaysDate().replaceAll('/', '-');
  },

  populateRightColumnWithTotalCost() {
    let number = separator(hotel.currentCustomer.totalSpent);
    dashboardRightColumn.innerHTML = `
      <h2 class="total-bill-headline">Your total bill for all bookings, past and present at the Overlook Hotel is:</h2>
      <h3 class="total-bill-amount grow">$${number}</h3>
      <div>
        <p class="total-bill-message">Thank you for your patronage.</p>
        <p class="total-bill-message">We look forward to seeing you again soon!</p>
      </div>
    `;
  },

  populateRightColumnWithChartHead(bookingsData) {  
    dashboardCenterColumn.innerHTML = `
      <table class="scrolling" tabindex="0"> 
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
    let newDate = sortDate(booking.date)
    tableBody.innerHTML += `
      <tr>
        <td>${roomType}</td>
        <td>${newDate}</td>
        <td>$${bookedRoom.costPerNight}</td>
      </tr>
    `;
  }
};

const querySelectors = {
  loginPassword,
  loginErrorMessage,
  customerDashboard
};

loginPassword.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    validateUserCredentials();
  }
});
loginButton.addEventListener('click', validateUserCredentials);
customerDisplay.addEventListener('click', (event) => {
  determineUserTabEvent(event);
});
customerDashboard.addEventListener('click', (event) => {
  domUpdates.determineColumnEvents(event);
});

export { 
  domUpdates, 
  querySelectors
};

