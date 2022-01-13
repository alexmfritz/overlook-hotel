import { expect } from 'chai';
import Booking from '../src/classes/Booking';
import bookingTestData from '../src/data/booking-test-data';

const getRandomIndex = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}

describe("Booking", () => {
  let booking;

  beforeEach(() => {
    booking = new Booking(getRandomIndex(bookingTestData));
  });

  it('should be an instance of Booking', () => {
    expect(booking).to.be.an.instanceOf(Booking);
  });

  it('should have a random string as a booking id', () => {
    expect(booking.id).to.be.a('string')
    expect(booking.id.length).to.deep.equal(17);
  });

  it('should keep track of the id of the user who booking the room', () => {
    expect(booking.userID).to.be.a('number');
    expect(booking.userID).to.be.greaterThan(0);
  });

  it('should should have a date associated with the booking', () => {
    expect(booking.date).to.be.a('string');
    expect(booking.date.length).to.deep.equal(10);
  });

  it('should have a room number associated with the booking', () => {
    expect(booking.roomNumber).to.be.a('number');
    expect(booking.roomNumber).to.be.greaterThan(0);
  });
});