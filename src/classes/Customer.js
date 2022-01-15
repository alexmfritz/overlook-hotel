export default class Customer {
  constructor(customerObj) {
    this.id = customerObj.id;
    this.name = customerObj.name;
    this.bookings =  [];
    this.totalSpent = 0;
    this.username = this.createUsername();
    this.password = `overlook2022`;
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
      return totalPrice;
    }, 0);
  }

  createUsername() {
    if (this.id < 10) {
      return `username0${this.id}`;
    } else {
      return `username${this.id}`;
    }
  }
}