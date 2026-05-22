import React, { useContext, useEffect, useState } from "react";

export const BookingDatas = React.createContext();

export default function DataProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState({
    start: null,
    end: null,
    isDragged: false,
  });

  useEffect(() => {
    async function getDatas() {
      try {
        setIsLoading(true);
        const response = await fetch("/bookings.json");
        if (!response.ok) {
          throw new Error("failed to fetch booking datas");
        }

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getDatas();
  }, []);

  return (
    <BookingDatas.Provider value={{ bookings, isLoading, error, selected, setSelected }}>
      {children}
    </BookingDatas.Provider>
  );
}
