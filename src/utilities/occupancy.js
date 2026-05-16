export default function occupancy(bookings, date) {
  let occupiedRooms = 0;

  bookings.forEach((booking) => {
    if (booking.status === "cancelled") return;

    const checkin = new Date(booking.checkIn);
    const checkout = new Date(booking.checkOut);

    if (checkin >= date && checkout > date) {
      occupiedRoom++;
    }
  });

  return occupiedRooms;
}
