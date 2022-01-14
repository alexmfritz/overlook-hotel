export default class Customer {
  constructor(customerObj, allBookingsData, allRoomsData) {
    this.id = customerObj.id;
    this.name = customerObj.name;
    this.bookings = this.getCustomerBookings(allBookingsData) || [];
    this.totalSpent = this.getTotalCustomerAmountSpent(allRoomsData);
  }

  getCustomerBookings(bookings) {
    return bookings.filter(booking => booking.userID === this.id);
  }

  getTotalCustomerAmountSpent(rooms) {
    if (this.bookings.length === 0) {
      return 0;
    }
    return this.bookings.reduce((totalPrice, booking) => {
      rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          totalPrice += room.costPerNight;
        }
      })
      return totalPrice;
    }, 0)
  }
}