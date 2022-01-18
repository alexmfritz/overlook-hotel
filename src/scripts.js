import './css/base.scss';
import { 
  allCustomersData, 
  allBookingsData, 
  allRoomsData, 
  fetchSingleCustomer, 
  postNewBooking,
  fetchData
} from './apiCalls';
import { domUpdates, querySelectors } from './domUpdates';
import Room from './classes/Room';
import Booking from './classes/Booking';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
let hotel;

const getRandomIndex = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}

function completeCustomerBooking(date, roomNumber, event) {
  const booking = hotel.currentCustomer.createBooking(date, roomNumber);
  postNewBooking(booking).then(data => {
    fetchData('bookings').then(data => {
      hotel.bookings = updateBookings(data)
      updateCustomer(date, event)
    })
  }).catch(error => displayFetchErrorMessage(error))
}

function updateCustomer(date, event) {
  hotel.currentCustomer.getCustomerBookings(hotel.bookings);
  domUpdates.informCustomerOfBookedRoom(event);
  hotel.filterAllAvailableRooms(date);
  domUpdates.displayCenterWithRoomsButtons(hotel.availableRooms);
}

function updateBookings(data) {
  return data.bookings.map(booking => new Booking(booking));
}

function getAllData() {
  return Promise.all([allRoomsData, allBookingsData, allCustomersData])
  .then(data => loadAllData(data))
  .catch(error => displayFetchErrorMessage(error));
}

function getSingleCustomerData(userID) {
  let singleCustomerFetch = fetchSingleCustomer(userID);
  return Promise.resolve(singleCustomerFetch);
}

function createAllRoomsData(data) {
  return data[0].rooms.map(room => new Room(room));
}

function createAllBookingsData(data) {
  return data[1].bookings.map(booking => new Booking(booking));
}

function createAllCustomersData(data) {
  return data[2].customers.map(customer => new Customer(customer));
}

// function createNewSingleUser(singleCustomer) {
//   hotel.currentCustomer = new Customer(singleCustomer);
//   domUpdates.showUserInfo();
// }

function createNewSingleUser() {
  hotel.currentCustomer = new Customer(getRandomIndex(hotel.customers));
  domUpdates.showUserInfo();
}

function loadAllData(data) {
  let rooms = createAllRoomsData(data);
  let bookings = createAllBookingsData(data);
  let customers = createAllCustomersData(data);
  hotel = new Hotel(rooms, bookings, customers);
}

function checkForError(response) {
  if (!response.ok) {
    throw new Error('Please make sure that all fields are filled out.');
  } else {
    return response.json();
  }
}

function displayFetchErrorMessage(error) {
  let message;
  error.message === 'Failed to fetch' ?
  message = 'Something went wrong. Please check your internet connection' :
  message = error.message;
  domUpdates.updateInnerText(querySelectors.customerDashboard, message);
}

// function validateUserCredentials() {
//   let loginUsername = document.getElementById('loginUsername');
//   let loginPassword = document.getElementById('loginPassword');
//   let userID = loginUsername.value.substring(8, 10);
//   if (!validateUsername(loginUsername) || !validatePassword(loginPassword)) {
//       domUpdates.invalidLoginMessage();
//   } else {
//       getAllData().then(data => {
//         domUpdates.showUserDashboard();
//         getSingleCustomerData(userID)
//         .then(data => createNewSingleUser(data))
//         .catch(error => displayFetchErrorMessage(error))
//       });
//     }
// }

function startSite() {
  getAllData().then(data => {
      createNewSingleUser()
      domUpdates.showUserDashboard()
  }).catch(error => displayFetchErrorMessage(error))
}


// function validateUsername(usernameInput) {
//   let id = usernameInput.value.slice(8, 10);
//   return usernameInput.value.slice(0, 8) === 'username' && 
//   usernameInput.value.length === 10 &&
//   (0 < id  && id < 51) ? true : false;
// }

// function validatePassword(passwordInput) {
//   return passwordInput.value === 'overlook2022' ? true: false;
// }

function determineUserTabEvent(event) {
  if (event.target.id === 'customerNewBookingsButton') {
    domUpdates.displayBookNewRooms();
  } else if (event.target.id === 'customerCurrentBookingsButton') {
    domUpdates.displayCustomerBookings();
  } else if (event.target.id === 'customerBillingInfoButton') {
    domUpdates.displayCustomerTotalCost();
  }
}

function getTodaysDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = yyyy + '/' + mm + '/' + dd;
  return today;
}

function determineBookingTime(booking) {
  let response;
  let today = getTodaysDate();
  if (booking.date < today) {
    response = 'Past Booking';
  } else if (booking.date === today) {
    response = 'Today\'s Booking';
  } else {
    response = 'Upcoming Booking';
  }
  return response;
}

export { 
  hotel,
  // validateUserCredentials,
  checkForError,
  getAllData,
  determineUserTabEvent,
  determineBookingTime,
  completeCustomerBooking,
  getTodaysDate,
  startSite
};