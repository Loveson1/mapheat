import "./index.css";
import CalendarGrid from "./components/CalendarGrid";
import { useContext } from "react";
import { BookingDatas } from "./context/context";
import DataProvider from "./context/context";
import BookingPanel from "./components/Booking";


function App() {
const {bookings, isLoading, error, } = useContext(BookingDatas);

if (isLoading) return <div>Data Loading...</div>
if (error) return <div>Error: {error}</div>


  return (
    <DataProvider >
      <div  className="flex">
        <div>
<CalendarGrid />
        </div>
      
      <div style={{ width: "50%"}}><BookingPanel/></div> 
      
      </div>
    </DataProvider>
  );
}

export default App;
