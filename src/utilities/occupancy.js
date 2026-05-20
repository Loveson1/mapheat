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


export function occupancyHeatmap(occupancy) {
    if (occupancy >= 8) {
        return "#00d727";
    } else if (occupancy >= 5) {
        return "#ffff00";
    } else if (occupancy >= 2) {
        return "#FFA500";
    }else if (occupancy >= 0) {
        return "#FF0000";
    } return "#016b01"

}