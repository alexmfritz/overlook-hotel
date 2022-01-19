export default class Hotel {
  constructor(rooms, bookings, customers) {
    this.rooms = rooms;
    this.bookings = bookings;
    this.customers = customers;
    this.currentCustomer = null;
    this.availableRooms = [];
  }

  filterAllAvailableRooms(date) {
    date = date.replaceAll('-', '/');
    console.log(date)
    let alreadyBooked = this.bookings.filter(booking => booking.date === date);
    this.availableRooms = this.rooms.reduce((availableRooms, room) => {
      if (!alreadyBooked.find(booking => booking.roomNumber === room.number)) {
        availableRooms.push(room);
      }
      console.log(availableRooms)
      return availableRooms;
    }, []);
  }

  filterRoomByType(type) {
    if (!this.availableRooms.length) {
      this.availableRooms = this.rooms.filter(room => room.roomType.includes(type));
    } else {
      this.availableRooms = this.availableRooms.filter(room => room.roomType.includes(type));
    }
  }
}