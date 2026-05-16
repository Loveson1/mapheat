import { useContext, useState } from "react";
import { getCalendarDays } from "../utilities/calendar";
import { BookingDatas } from "../context/context";
import { getOccupancy } from "../utilities/occupancy";

function CalendarGrid() {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  const Days = Array.from({ length: 31 }, (_, index) => index + 1);

  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  // context data for bookings
  const { bookings } = useContext(BookingDatas);

  const calendarDays = getCalendarDays(year, month);

  return (
    <>
      <h2 className="header">
        {monthName} {year}
      </h2>
      <div className="grid">
        {weekDays.map((days) => (
          <div key={days}>
            <p>{days}</p>
          </div>
        ))}
      </div>
      <div className="grid">
        {calendarDays.map((day, index) => {
          const occupiedRooms = getOccupancy(bookings, day.date);

          return (
            <div key={index} className="line">
              <p>{day.dayNumber}</p>
              <small>{occupiedRooms}/10 occupied</small>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CalendarGrid;
