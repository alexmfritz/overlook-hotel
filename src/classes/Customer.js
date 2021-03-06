export default class Customer {
  constructor(customerObj) {
    this.id = customerObj.id;
    this.name = customerObj.name;
    this.bookings =  [];
    this.totalSpent = 0;
  }

  getCustomerBookings(bookings) {
    this.bookings = bookings.filter(booking => booking.userID === this.id);
  }

  getTotalCustomerAmountSpent(rooms) {
    if (this.bookings.length === 0) {
      return 0;
    }
    this.totalSpent = this.bookings.reduce((totalPrice, booking) => {
      rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          totalPrice += room.costPerNight;
        }
      })
      return parseFloat(totalPrice.toFixed(2));
    }, 0);
  }

  createBooking(date, roomNumber) {
    return {
      userID: this.id,
      date: date,
      roomNumber: parseInt(roomNumber)
    }
  }
}