import { expect } from 'chai';
import bookingTestData from '../src/data/booking-test-data';
import roomTestData from '../src/data/room-test-data';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import Hotel from '../src/classes/Hotel';

describe('Hotel', () => {
  let rooms;
  let bookings;
  let hotel;

  beforeEach(() => {
    rooms = roomTestData.map(room => new Room(room));
    bookings = bookingTestData.map(booking => new Booking(booking));
    hotel = new Hotel(rooms, bookings);
  });

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('should be able to keep track of all rooms', () => {
    expect(hotel.rooms).to.be.an('Array');
    expect(hotel.rooms.length).to.deep.equal(8);
  });

  it('should be able to keep track of all the bookings', () => {
    expect(hotel.bookings).to.be.an('Array');
    expect(hotel.bookings.length).to.deep.equal(7);
  });

  it('should have no available rooms by default', () => {
    expect(hotel.availableRooms).to.deep.equal([]);
  });

  it('should be able to filter all available rooms', () => {
    hotel.filterAllAvailableRooms('2022/01/10');
    expect(hotel.availableRooms.length).to.deep.equal(3);
    expect(hotel.availableRooms).to.deep.equal([rooms[0], rooms[2], rooms[3]]);
  });

  it('should be able to filter by room types once available rooms are shown', () => {
    hotel.filterAllAvailableRooms('2022/01/10');
    let singleRooms = hotel.filterRoomByType('single room');
    let residentialSuites = hotel.filterRoomByType('residential suite');
    expect(singleRooms).to.deep.equal([rooms[2], rooms[3]]);
    expect(residentialSuites).to.deep.equal([rooms[0]]);
  });

  it('should be able to determine the percentage of occupied rooms', () => {
    let occupied = hotel.calculateTotalOccupied('2022/01/10');
    expect(occupied).to.deep.equal('62.50%');
  });

  it('should be able to calculate the total revenue for a chosen day', () => {
    let totalRevenue = hotel.calculateTotalRevenue('2022/01/10');
    expect(totalRevenue).to.deep.equal('$1740.59');
  });
})