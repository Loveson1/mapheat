import "./index.css";
import CalendarGrid from "./components/CalendarGrid";
import { useContext } from "react";
import { BookingDatas } from "./context/context";
import DataProvider from "./context/context";


function App() {
const {bookings, isLoading, error, } = useContext(BookingDatas);

if (isLoading) return <div>Data Loading...</div>
if (error) return <div>Error: {error}</div>


  return (
    <DataProvider>
      <CalendarGrid />
    </DataProvider>
  );
}

export default App;
