import { expect } from 'chai';
import Customer from '../src/classes/Customer';
import customerTestData from '../src/data/customer-test-data';
import bookingTestData from '../src/data/booking-test-data';
import roomTestData from '../src/data/room-test-data';
import Booking from '../src/classes/Booking';
import Room from '../src/classes/Room';

describe('Customer', () => {
  let rooms;
  let bookings;
  let customerOne;
  let customerTwo;

  beforeEach(() => {
    rooms = roomTestData.map(room => new Room(room));
    bookings = bookingTestData.map(booking => new Booking(booking));
    customerOne = new Customer(customerTestData[1], bookings, rooms);
    customerTwo = new Customer(customerTestData[5], bookings, rooms)
  })

  it('should be an instance of Customer', () => {
    expect(customerOne).to.be.an.instanceOf(Customer);
  });

  it('shoulder have an id', () => {
    expect(customerOne.id).to.be.a('number');
    expect(customerOne.id).to.be.greaterThan(0);
  });

  it('should have a name', () => {
    expect(customerOne.name).to.be.a('string');
  });

  it('should be able to keep track of their bookings', () => {
    expect(customerOne).to.haveOwnProperty('bookings');
  });

  it('should have no bookings by default', () => {
    expect(customerOne.bookings).to.deep.equal([]);
  });

  it('should have a list of bookings if user has made a booking', () => {
    customerTwo.getCustomerBookings(bookings);
    expect(customerTwo.bookings.length).to.deep.equal(1);
    expect(customerTwo.bookings).to.deep.equal([bookings[0]]);
  });

  it('should be able to keep track of their total amount spent on bookings', () => {
    expect(customerOne).to.haveOwnProperty('totalSpent');
  });

  it('should have a default amount of 0 if no bookings have been made', () => {
    customerOne.getCustomerBookings(bookings);
    customerOne.getTotalCustomerAmountSpent(rooms);
    expect(customerOne.totalSpent).to.deep.equal(0);
  });

  it('should calculate the amount spent on their bookings if they have made any', () => {
    customerTwo.getCustomerBookings(bookings);
    customerTwo.getTotalCustomerAmountSpent(rooms);
    expect(customerTwo.totalSpent).to.deep.equal(231.46);
  });
});