const fetchData = (api) => {
  fetch(`http://localhost:3001/api/v1/${api}`)
  .then(response => response.json());
}

const allCustomersData = fetchData('customer');
const allBookingsData = fetchData('bookings');
const allRoomsData = fetchData('rooms');

const fetchSingleCustomer = (id) => {
  fetch(`http://localhost:3001/api/v1/customers/${id}`)
  .then(response => response.json())
  .then(data => data)
  .catch(error => console.log(error))
}

const postNewBooking = (bookingObj) => {
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

const deleteSingleBooking = (bookingID) => {
  fetch(`http://localhost:3001/api/v1/bookings/${bookingID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

module.exports = { 
  allCustomersData, 
  allBookingsData, 
  allRoomsData, 
  fetchSingleCustomer, 
  postNewBooking, 
  deleteSingleBooking 
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