import { expect } from 'chai';
import Booking from '../src/classes/Booking';
import bookingTestData from '../src/data/booking-test-data';

const getRandomIndex = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}

describe("Room", () => {
  let booking;

  beforeEach(() => {
    booking = new Room(getRandomIndex(bookingTestData));
  });

  it('should have a random string as a booking id', () => {
    expect(booking.id).to.be.a('string');
    expect(booking.id.length).to.be(17);
  });

  it('should keep track of the id of the user who booking the room', () => {
    expect(booking.userID).to.be.a('number');
    expect(booking.userID).to.be.greaterThan(0);
  });

  it('should should have a date associated with the booking', () => {
    expect(booking.date).to.be.a('string');
    expect(booking.date.length).to.be(10);
  });

  it('should have a room number associated with the booking', () => {
    expect(booking.roomNumber).to.be.a('number');
    expect(booking.roomNumber).to.be.greaterThan(0);
  });
});