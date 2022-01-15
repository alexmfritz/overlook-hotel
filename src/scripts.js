import './css/base.scss';
import { 
  allCustomersData, 
  allBookingsData, 
  allRoomsData, 
  fetchSingleCustomer, 
  postNewBooking,
} from './apiCalls';
import { domUpdates, querySelectors } from './domUpdates';
import Room from './classes/Room';
import Booking from './classes/Booking';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';

let allRooms;
let allBookings;
let allCustomers;
let hotel;

function getAllData() {
  Promise.all([allRoomsData, allBookingsData, allCustomersData]).then(data =>{
    loadAllData(data)
  }).catch(error => displayFetchErrorMessage(error));
}

function getAllBookingsData(data) {
  createAllBookingsData(data[1].bookings);
}

function createAllBookingsData(bookingsData) {
  allBookings = bookingsData.map(booking => new Booking(booking));
}

function getAllCustomerData(data) {
  createAllCustomerData(data[2].customers);
}

function createAllCustomerData(customersData) {
  allCustomers = customersData.map(customer => new Customer(customer));
}

function getAllRoomsData(data) {
  createAllRoomsData(data[0].rooms);
}

function createAllRoomsData(roomsData) {
  allRooms = roomsData.map(room => new Room(room));
}

function loadAllData(data) {
  getAllRoomsData(data);
  getAllBookingsData(data);
  getAllCustomerData(data);
  hotel = new Hotel(allRooms, allBookings);
  console.log(hotel);
  console.log(allCustomers);
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
  if (loginUsername.value !== 'username2022' && loginPassword !== 'overlook2022') {
    querySelectors.loginErrorMessage.innerText = "Please enter the correct credentials!";
  } else {
    // let userID = loginUsername.value.substring(10, 12);
    // console.log(userID);
    domUpdates.showUserDashboard();
    getAllData();
  }
}


export { 
  validateUserCredentials,
  checkForError
};