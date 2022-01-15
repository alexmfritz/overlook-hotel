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
  .then(response => {
    if(!response.ok) {
      console.log(response.json())
      throw response
    }
    return response.json()
  })
}

export { 
  allCustomersData, 
  allBookingsData, 
  allRoomsData, 
  fetchSingleCustomer, 
  postNewBooking,
};

// export default fetchAllCustomer = () => {
//   fetch('http://localhost:3001/api/v1/customers')
//   .then(response => response.json())
//   .then(data => data)
//   .catch(error => console.log(error))
// }

// export default fetchAllRooms = () => {
//   fetch('http://localhost:3001/api/v1/rooms')
//   .then(response => response.json())
//   .then(data => data)
//   .catch(error => console.log(error));
// }

// export default fetchAllBookings = () => {
//   fetch('http://localhost:3001/api/v1/bookings')
//   .then(response => response.json())
//   .then(data => data)
//   .catch(error => console.log(error))
// }