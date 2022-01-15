import './css/base.scss';
import { 
  allCustomersData, 
  allBookingsData, 
  allRoomsData, 
  fetchSingleCustomer, 
  postNewBooking,
} from './apiCalls';
import { 
  domUpdates, 
  querySelectors
} from './domUpdates';
import Room from './classes/Room';
import Booking from './classes/Booking';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';

let allRooms;
let allBookings;
let allCustomers;
let customer;
let hotel;

function getAllData() {
  return Promise.all([allRoomsData, allBookingsData, allCustomersData])
  .then(data => loadAllData(data))
  .catch(error => displayFetchErrorMessage(error));
}

function getSingleCustomerData(userID) {
  let singleCustomerFetch = fetchSingleCustomer(userID);
  return Promise.resolve(singleCustomerFetch);
}

function createAllRoomsData(roomsData) {
  allRooms = roomsData.map(room => new Room(room));
}

function createAllBookingsData(bookingsData) {
  allBookings = bookingsData.map(booking => new Booking(booking));
}

function createAllCustomersData(customersData) {
  allCustomers = customersData.map(customer => new Customer(customer));
}

function createNewSingleUser(singleCustomer) {
  customer = new Customer(singleCustomer);
  domUpdates.showUserInfo();
}

function getAllRoomsData(data) {
  createAllRoomsData(data[0].rooms);
}

function getAllBookingsData(data) {
  createAllBookingsData(data[1].bookings);
}

function getAllCustomersData(data) {
  createAllCustomersData(data[2].customers);
}

function loadAllData(data) {
  getAllRoomsData(data);
  getAllBookingsData(data);
  getAllCustomersData(data);
  hotel = new Hotel(allRooms, allBookings);
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
  if (error.message === 'Failed to fetch') {
    message = 'Something went wrong. Please check your internet connection';
  } else {
    message = error.message;
  }
  domUpdates.updateInnerText(querySelectors.customerInfo, message);
}

function validateUserCredentials() {
  let loginUsername = document.getElementById('loginUsername');
  let loginPassword = document.getElementById('loginPassword');
  let userID = loginUsername.value.substring(8, 10);
  getAllData()
  .then(data => {
    if (!validateUsername(loginUsername) || !validatePassword(loginPassword)) {
      domUpdates.invalidLoginMessage();
    } else {
      domUpdates.showUserDashboard();
      getSingleCustomerData(userID)
      .then(data => createNewSingleUser(data))
      .catch(error => displayFetchErrorMessage(error))
      }
  });
}

function validateUsername(usernameInput) {
  return allCustomers.find(customer => customer.username === usernameInput.value) ? true : false;
}

function validatePassword (passwordInput) {
  return allCustomers.find(customer => customer.password === passwordInput.value) ? true: false;
}

export { 
  customer,
  allCustomers,
  allBookings,
  allRooms,
  hotel,
  validateUserCredentials,
  checkForError,
  getAllData
};