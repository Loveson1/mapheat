import { useState } from "react";
import { getCalendarDays } from "../utilities/calendar";

function CalendarGrid() {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  const Days = Array.from({length: 31}, (_, index) => index + 1)

  const [currentDate, setCurrentDate] = useState(new Date())
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
 const monthName = currentDate.toLocaleString("default", {month: "long"})

 const calendarDays = getCalendarDays(year, month)
  



  

  return (
    <>
    <h2 className="header">{monthName} {year}</h2>
    <div className="grid">
      {weekDays.map((days) => (
        <div key={days}>
          <p>{days}</p>
        </div>
      ))}
      </div>
<div className="grid">
     {calendarDays.map((day, index) => (
        <div key={index} className="line" >
          <p>{day.dayNumber}</p>
        </div>
     ))}</div>
    </>
  );
}

export default CalendarGrid;
