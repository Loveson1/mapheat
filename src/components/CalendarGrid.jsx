import { useContext, useState, useEffect } from "react";
import { getCalendarDays } from "../utilities/calendar";
import { BookingDatas, SelectDate } from "../context/context";
import { getOccupancy, occupancyHeatmap } from "../utilities/occupancy";

function CalendarGrid() {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  // const Days = Array.from({ length: 31 }, (_, index) => index + 1);

  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  // context data for bookings and selection
  const { bookings } = useContext(BookingDatas);
  const { selected, setSelected } = useContext(SelectDate);

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
    setSelected({ start: date, end: date, isDragged: true });
  };

  const handleMouseEnter = (date) => {
    if (!selected.isDragged) return;
    setSelected((prev) => ({ ...prev, end: date, isDragged: true }));
  };

  const handleMouseUp = () => {
    setSelected((prev) => ({ ...prev, isDragged: false }));
  };

  // logic for the drag back and forth on the calendar
  const start = selected.start;
  const end = selected.end;
  const from = start > end ? end : start;
  const to = start > end ? start : end;



  //logic for handling selection outside grid
  useEffect(() => {
    const handleMouseUp = () => {
      setSelected((prev) => ({ ...prev, isDragged: false }));
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <>
    
      <div className="flex-btw">

     <div>
      <h2 className="header">
        {monthName} {year}
      </h2>
      </div>
      
      <div >
        <button onClick={handlePrevMonth}>prev</button>
        <button onClick={handleCurrentMonth}>today</button>
        <button onClick={handleNextMonth}>next</button>
      </div> 
      </div>
      <div className="grid">
        {weekDays.map((days) => (
          <div key={days}>
            <p>{days}</p>
          </div>
        ))}
      </div>
      <div className="grid">
        {calendarDays.map((day, index) => {
          const isSelected =
            selected.start &&
            selected.end &&
            day.date >= from &&
            day.date <= to;
          const occupiedRooms = getOccupancy(bookings, day.date);
          const backgroundColor = isSelected
            ? "#ffff"
            : day.isCurrentMonth
              ? occupancyHeatmap(occupiedRooms)
              : "#ccc";

          return (
            <div
              key={index}
              className="line"
              style={{ backgroundColor }}
              onMouseDown={() => handleMouseDown(day.date)}
              onMouseEnter={() => handleMouseEnter(day.date)}
              onMouseUp={handleMouseUp}
            >
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
