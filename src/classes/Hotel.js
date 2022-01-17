export default class Hotel {
  constructor(roomsData, bookingsData) {
    this.rooms = roomsData;;
    this.bookings = bookingsData;
    this.availableRooms = [];
  }

  filterAllAvailableRooms(date) {
    let alreadyBooked = this.bookings.filter(booking => booking.date === date);
    this.availableRooms = this.rooms.reduce((availableRooms, room) => {
      if (!alreadyBooked.find(booking => booking.roomNumber === room.number)) {
        availableRooms.push(room);
      }
      return availableRooms;
    }, []);
  }

  filterRoomByType(type) {
    if (!this.availableRooms.length) {
      this.availableRooms = this.rooms.filter(room => room.roomType === type);
    } else {
      this.availableRooms = this.availableRooms.filter(room => room.roomType === type);
    }
  }
}