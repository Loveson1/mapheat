import { useContext, useState } from "react";
import { getCalendarDays } from "../utilities/calendar";
import { BookingDatas } from "../context/context";
import { getOccupancy, occupancyHeatmap } from "../utilities/occupancy";

function CalendarGrid() {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  const Days = Array.from({ length: 31 }, (_, index) => index + 1);

  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  // context data for bookings and selection
  const { bookings } = useContext(BookingDatas);
  const {setSelected} = useContext(BookingDatas)

  const calendarDays = getCalendarDays(year, month);

  // function to handle month change
  const nextMonth = new Date(year, month + 1, 1);
  const prevMonth = new Date(year, month - 1, 1);

  const handleNextMonth = () => {
    setCurrentDate(nextMonth);
  };
  const handleCurrentMonth = () => {
    setCurrentDate(new Date());
  };
  const handlePrevMonth = () => {
    setCurrentDate(prevMonth);
  };

  //functions for handling selection
  const handleMouseDown = (date) => {
    setSelected({ start: date, end: null, isDragged: false });
  }


  return (
    <> <div style={{ position: "fixed", top: "20px"}}>
        <button onClick={handlePrevMonth}>prev</button>
        <button onClick={handleCurrentMonth}>today</button>
        <button onClick={handleNextMonth}>next</button>
      </div>
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
          const backgroundColor = day.isCurrentMonth ? occupancyHeatmap(occupiedRooms): "#ccc"

          return (
            <div key={index} className="line" style={{ backgroundColor }}>
              <p className="bla"> {day.dayNumber}</p>
              <small className="bla"> {occupiedRooms}/10 occupied</small>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CalendarGrid;
