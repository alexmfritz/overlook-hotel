import { checkForError } from './scripts';


function fetchData(api) {
  return fetch(`http://localhost:3001/api/v1/${api}`)
    .then(response => checkForError(response))
}

const allCustomersData = fetchData('customers');
const allBookingsData = fetchData('bookings');
const allRoomsData = fetchData('rooms');

function fetchSingleCustomer(id) {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
    .then(response => checkForError(response))
}

function postNewBooking(bookingObj) {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingObj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkForError(response))
}

export { 
  allCustomersData, 
  allBookingsData, 
  allRoomsData, 
  fetchSingleCustomer, 
  postNewBooking,
  fetchData
};
