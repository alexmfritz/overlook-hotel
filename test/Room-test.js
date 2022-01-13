import { expect } from 'chai';
import Room from '../src/classes/Room';
import roomTestData from '../src/data/room-test-data';

const getRandomIndex = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}

describe("Room", () => {
  let room;

  beforeEach(() => {
    room = new Room(getRandomIndex(roomTestData));
  });

  it('should be an instance of Room', () => {
    expect(room).to.be.an.instanceOf(Room);
  });

  it('should have a room number', () => {
    expect(room.number).to.be.a('number');
    expect(room.number).to.be.greaterThan(0);
  });

  it('should have a roomType', () => {
    expect(room.roomType).to.be.a('string');
    expect(room.roomType.length).to.be.greaterThan(0);
  });

  it('should keep track of whether or not it offers amenities', () => {
    expect(room.bidet).to.be.a('boolean');
  });

  it('should be able to list its bed sizes', () => {
    expect(room.bedSize).to.be.a('string');
    expect(room.bedSize.length).to.be.greaterThan(0);
  });

  it('should keep track of the number of beds it offers', () => {
    expect(room.numBeds).to.be.a('number');
    expect(room.numBeds).to.be.greaterThan(0);
  });

  it('should keep track of its daily cost', () => {
    expect(room.costPerNight).to.be.a('number');
    expect(room.costPerNight).to.be.greaterThan(0);
  });
});