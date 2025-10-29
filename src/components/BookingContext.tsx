// BookingContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

interface BookingContextType {
  ongoingBooking: any | null;
  bookingMessage: string;
  refreshBooking: () => void;
}

const BookingContext = createContext<BookingContextType>({
  ongoingBooking: null,
  bookingMessage: "",
  refreshBooking: () => {},
});

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ongoingBooking, setOngoingBooking] = useState<any>(null);
  const [bookingMessage, setBookingMessage] = useState<string>("");

  const refreshBooking = async () => {
    try {
      const data = await apiRequest("/bookingController/bookings/user", "GET");

      // Find any active booking (requested, assigned, started)
      const activeBooking =
        data.bookings?.find(
          (b: any) =>
            b.bookingStatus === "requested" ||
            b.bookingStatus === "assigned" ||
            b.bookingStatus === "started"
        ) || null;

      setOngoingBooking(activeBooking);

      // Determine the message based on status
      if (activeBooking) {
        switch (activeBooking.bookingStatus) {
          case "requested":
            setBookingMessage("Booking requested ⏳");
            break;
          case "assigned":
            setBookingMessage("Driver assigned 🚗");
            break;
          case "started":
            setBookingMessage("Ride in progress 🏁");
            break;
          default:
            setBookingMessage("");
        }
      } else {
        setBookingMessage("");
      }
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setOngoingBooking(null);
      setBookingMessage("");
    }
  };

  useEffect(() => {
    refreshBooking();
    const interval = setInterval(refreshBooking, 10000); // poll every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <BookingContext.Provider value={{ ongoingBooking, bookingMessage, refreshBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
