import { useContext } from "react";
import { BookingDatas, SelectDate } from "../context/context";
import { normalize } from "../utilities/calendar";

export default function BookingPanel() {
  const { selected } = useContext(SelectDate);
  const { bookings } = useContext(BookingDatas);

  const start = selected.start;
  const end = selected.end;
  const from = start > end ? end : start;
  const to = start > end ? start : end;

  if (!to || !from) return <div>Please select a date range</div>;

  const SelectedBookings = bookings.filter((booking) => {
    if (booking.status === "cancelled") return false;
    const checkin = new Date(booking.checkIn);
    const checkout = new Date(booking.checkOut);
    return normalize(to) >= normalize(checkin) && normalize(from) < normalize(checkout) ;
  });

  return (
    <div>
      {SelectedBookings.map((booking) => (
        <div
          key={booking.id}
          style={{ border: "1px solid black", margin: "10px 0", padding: "10px" }}
        >
          <p>{booking.checkIn}</p>
          <p>{booking.checkOut}</p>
        </div>
      ))}
    </div>
  );
}
