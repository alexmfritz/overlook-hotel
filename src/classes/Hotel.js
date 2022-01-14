import Booking from './Booking';
import Room from './Room';

export default class Hotel {
  constructor(roomsData, bookingsData) {
    this.rooms = roomsData.map(room => new Room(room));
    this.bookings = bookingsData.map(booking => new Booking(booking));
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
    return this.availableRooms.filter(room => room.roomType === type);
  }

  calculateTotalOccupied(date) {
    this.filterAllAvailableRooms(date);
    let percent = (1 - (this.availableRooms.length / this.rooms.length)) * 100;
    return `${percent.toFixed(2)}%`
  }

  calculateTotalRevenue(date) {
    let todaysRooms = this.bookings.filter(booking => booking.date === date);
    let revenue = todaysRooms.reduce((totalRevenue, booking) => {
      this.rooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          totalRevenue += room.costPerNight;
        }
      })
      return totalRevenue;
    }, 0);
    return `$${revenue.toFixed(2)}`
  }
}