import React, { useContext, useEffect, useState } from "react";


export const BookingDatas = React.createContext();

export default function DataProvider({ children }) {
  const [booking, setBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getDatas() {
      try {
        setIsLoading(true);
        const response = await fetch("/bookings.json");
        if (!response.ok) {
          throw new Error("failed to fetch booking datas");
        }

        const data = await response.json();
        setBooking(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getDatas();
  }, []);

  return (
    <BookingDatas.Provider value={{ booking, setBooking, isLoading, error }}>
      {children}
    </BookingDatas.Provider>
  );
}
