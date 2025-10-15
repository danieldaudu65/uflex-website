import React, { useEffect, useState } from "react";
import { arriw_right, arrow_left, car_icon } from "../assets";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-hot-toast";
import { apiRequest } from "../utils/api";
import ModalWrapper from "../components/modalParent";

const History: React.FC = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rebookData, setRebookData] = useState({ id: "", date: "", time: "" });

  // ===== FETCH USER BOOKINGS =====
  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      const data = await apiRequest("/bookingController/bookings/all", "GET");
      setBookings(data.bookings || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  // ===== REBOOK FUNCTION =====
  const handleRebook = async () => {
    if (!rebookData.id || !rebookData.date || !rebookData.time) {
      toast.error("Please select a new date and time");
      return;
    }

    try {
      await apiRequest(`/bookingController/bookings/rebook/${rebookData.id}`, "POST", {
        bookingDate: rebookData.date,
        bookingTime: rebookData.time,
      });

      toast.success("Ride rebooked successfully!");
      setRebookData({ id: "", date: "", time: "" });
      fetchUserBookings();
    } catch (error: any) {
      toast.error(error.message || "Error rebooking");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 flex justify-center">
        {/* Centered Responsive Container */}
        <div className="p-4 w-full max-w-3xl min-h-[90vh]">
          {/* Header */}
          <div className="flex mb-6 gap-3 items-center">
            <img
              src={arrow_left}
              onClick={() => navigate(-1)}
              alt="back"
              className="cursor-pointer"
            />
            <h3 className="text-lg font-medium">My bookings</h3>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : bookings.length === 0 ? (
            <p className="text-center text-gray-500">No bookings found</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((rec, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 shadow-md rounded-2xl px-4 py-2 sm:p-4"
                >
                  {/* Booking Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm my-4 gap-3">
                    <div className="flex items-start gap-3">
                      <img src={car_icon} alt="" className="w-6 h-6" />
                      <div className="space-y-1">
                        <p className="capitalize font-medium">{rec.serviceType}</p>
                        <div className="flex text-sm gap-2 flex-wrap items-center">
                          <p>{rec.pickupLocation}</p>
                          <img src={arriw_right} alt="" className="w-3 h-3" />
                          <p>{rec.dropoffLocation}</p>
                        </div>
                        <p className="text-[#7A7E83] text-xs">
                          {new Date(rec.bookingDate).toLocaleDateString()} — {rec.bookingTime}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`p-1.5 rounded-full px-3 text-xs sm:text-sm ${
                        rec.bookingStatus === "assigned"
                          ? "bg-[#FEEFE7] text-[#F56212]"
                          : "bg-[#D2F6B0] text-[#4FA000]"
                      }`}
                    >
                      {rec.bookingStatus || "Pending"}
                    </p>
                  </div>

                  <hr className="text-gray-300" />

                  {/* Vehicle + Price */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm py-4 gap-2">
                    <div>
                      <p className="text-[#393E46] text-xs">Vehicle type</p>
                      <p>{rec.vehicle || "--"}</p>
                    </div>
                    <p className="text-[#4FA000] font-bold">
                      {rec.totalPrice && rec.totalPrice !== "-"
                        ? `₦${Number(rec.totalPrice).toLocaleString()}`
                        : "--"}
                    </p>
                  </div>

                  {/* Book Again Button */}
                  <div>
                    <button
                      onClick={() => setRebookData({ id: rec._id, date: "", time: "" })}
                      className="w-full py-2.5 mb-4 rounded-xl font-bold bg-[#D2F6B0]"
                    >
                      Book again
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== REBOOK MODAL ===== */}
      {rebookData.id && (
        <ModalWrapper
          isOpen
          onClose={() => setRebookData({ id: "", date: "", time: "" })}
        >
          <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-[90%] max-w-sm shadow-lg space-y-4">
              <h3 className="text-lg font-semibold">Rebook Ride</h3>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">New Date</p>
                  <input
                    type="date"
                    value={rebookData.date}
                    onChange={(e) =>
                      setRebookData({ ...rebookData, date: e.target.value })
                    }
                    className="border w-full rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">New Time</p>
                  <input
                    type="time"
                    value={rebookData.time}
                    onChange={(e) =>
                      setRebookData({ ...rebookData, time: e.target.value })
                    }
                    className="border w-full rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={() => setRebookData({ id: "", date: "", time: "" })}
                  className="text-gray-600 px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRebook}
                  className="bg-[#4FA000] text-white rounded-lg px-4 py-2 text-sm"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </ModalWrapper>
      )}

      <Footer />
    </div>
  );
};

export default History;
