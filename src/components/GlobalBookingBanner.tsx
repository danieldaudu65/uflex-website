import { useBooking } from "./BookingContext";
import { useNavigate, useLocation } from "react-router-dom";

const GlobalBookingSignal = () => {
  const { ongoingBooking } = useBooking();
  const navigate = useNavigate();
  const location = useLocation();

  if (!ongoingBooking) return null;

  // ✅ Hide the signal if you're already viewing the ongoing booking page
  const isCurrentBookingPage =
  (  location.pathname === `/booking/book/${ongoingBooking._id}`) || location.pathname === `/booking`;

  if (isCurrentBookingPage) return null;

  return (
    <div
      onClick={() => navigate(`/booking/book/${ongoingBooking._id}`)}
      className="cursor-pointer fixed right-4 top-1/2 -translate-y-1/2 z-50 flex items-center space-x-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-red-200 hover:scale-105 transition-transform"
    >
      <div className="relative">
        {/* Outer pulse ring */}
        <span className="absolute inline-flex h-6 w-6 rounded-full bg-red-500 opacity-75 animate-ping"></span>

        {/* Inner solid circle */}
        <span className="relative inline-flex rounded-full h-6 w-6 bg-red-600 border-2 border-white shadow-md"></span>
      </div>

      <p className="text-sm font-medium text-red-700">
        A booking is ongoing
      </p>
    </div>
  );
};

export default GlobalBookingSignal;
