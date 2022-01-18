import { expect } from 'chai';
import roomTestData from '../src/data/room-test-data';
import bookingTestData from '../src/data/booking-test-data';
import customerTestData from '../src/data/customer-test-data';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import Customer from '../src/classes/Customer';
import Hotel from '../src/classes/Hotel';

const getRandomIndex = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}

describe('Hotel', () => {
  let rooms;
  let bookings;
  let customers;
  let hotel;

  beforeEach(() => {
    rooms = roomTestData.map(room => new Room(room));
    bookings = bookingTestData.map(booking => new Booking(booking));
    customers = customerTestData.map(customer => new Customer(customer));
    hotel = new Hotel(rooms, bookings, customers);
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

  it('should be able to keep track of all the customers who have interacted with the hotel', () => {
    expect(hotel.customers).to.be.an('Array');
    expect(hotel.customers.length).to.deep.equal(7);
  });

  it('should be able to keep track of the current customer with no customer by default', () => {
    expect(hotel.currentCustomer).to.deep.equal(null);
  });

  it('should be able to keep track of the current customer using the hotel after login', () => {
    hotel.currentCustomer = new Customer(getRandomIndex(hotel.customers));
    expect(hotel.currentCustomer).to.be.an.instanceOf(Customer);
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
    hotel.filterRoomByType('single room');
    expect(hotel.availableRooms).to.deep.equal([rooms[2], rooms[3]]);
  });

  it('should be able to filter by date regardless of a date being chosen', () => {
    hotel.filterRoomByType('single room');
    expect(hotel.availableRooms).to.deep.equal([rooms[2], rooms[3], rooms[4], rooms[6]]);
  });
});