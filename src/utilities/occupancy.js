import { normalize } from "./calendar";
export  function getOccupancy(bookings, date) {
  let occupiedRooms = 0;

  const target = normalize(date)

  bookings.forEach((booking) => {
    if (booking.status === "cancelled") return;

    const checkin = normalize(new Date(booking.checkIn));
    const checkout = normalize(new Date(booking.checkOut));

    if (target >= checkin && checkout > target) {
      occupiedRooms++;
    }
  });

  return occupiedRooms;
}


export function occupancyHeatmap(bookings, date) {
    
}