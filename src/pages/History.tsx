import React, { useEffect, useState } from "react";
import { arriw_right, arrow_left, car_icon } from "../assets";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-hot-toast";
import { apiRequest } from "../utils/api";
import ModalWrapper from "../components/modalParent";
import ConfirmButton from "../components/ConfirmButton";
import PolicyModal from "../components/PolicyModal";

const History: React.FC = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmingPaymentIds, setConfirmingPaymentIds] = useState<string[]>([]);
  const [showPolicy, setShowPolicy] = useState<{ open: boolean; bookingId?: string }>({ open: false });


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

  const handlePolicyAgree = async (bookingId: string) => {
    setShowPolicy({ open: false });
    setConfirmingPaymentIds((prev) => [...prev, bookingId]);
    toast.loading("Waiting for admin to confirm payment...");

    try {
      await apiRequest("/bookingController/confirm_payment", "POST", { bookingId });
      toast.dismiss();
      toast.success("✅ Payment request sent! Waiting for admin confirmation.");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to send payment confirmation ❌");
      setConfirmingPaymentIds((prev) => prev.filter((id) => id !== bookingId));
    }
  };


  // ✅ Auto-refresh bookings — stops when all are completed or paid
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const refreshBookings = async () => {
      try {
        const data = await apiRequest("/bookingController/bookings/all", "GET");
        const updatedBookings = data.bookings || [];

        setBookings((prev) =>
          updatedBookings.map((newBk: any) => {
            const existing = prev.find((p) => p._id === newBk._id);
            // Remove from confirmingPaymentIds if paid
            if (newBk.paymentStatus === "paid") {
              setConfirmingPaymentIds((prevIds) =>
                prevIds.filter((id) => id !== newBk._id)
              );
            }
            return existing ? { ...existing, ...newBk } : newBk;
          })
        );

        // 🛑 Stop auto-refresh if ALL bookings are completed or paid
        const allDone = updatedBookings.every(
          (b: any) =>
            b.bookingStatus === "completed" || b.paymentStatus === "paid"
        );

        if (allDone) {
          clearInterval(interval);
          console.log("⏹️ Auto-refresh stopped — all bookings completed or paid");
        }
      } catch (err) {
        console.error("Auto-refresh error:", err);
      }
    };

    refreshBookings();
    interval = setInterval(refreshBookings, 10000);

    return () => clearInterval(interval);
  }, []);

  const getButtonState = (rec: any) => {
    const price = parseFloat(rec?.totalPrice);

    if (confirmingPaymentIds.includes(rec._id)) {
      return { label: "Payment Confirming...", onClick: () => { }, disabled: true };
    }

    // PRIORITY: started ride first
    if (rec.bookingStatus === "started") {
      return { label: "Ongoing Ride 🚗", onClick: () => { }, disabled: true };
    }

    if (rec.bookingStatus === "completed") {
      return {
        label: "Book Again",
        onClick: () => setRebookData({ id: rec._id, date: "", time: "" }),
        disabled: false,
      };
    }

    if (rec.paymentStatus === "paid") {
      return { label: "Payment Confirmed ✅", onClick: () => { }, disabled: true };
    }

    if (!price || price <= 0) {
      return { label: "Pending Payment", onClick: () => { }, disabled: true };
    }

    // Default: Confirm Payment
    return {
      label: "Confirm Payment",
      onClick: () => setShowPolicy({ open: true, bookingId: rec._id }),
      disabled: false,
    };
  };
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
                  <div className="flex lex-col flex-row items-center justify-between text-sm my-4 gap-3">
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
                        {rec.is_excort && (
                          <p className="text-xs text-[#4FA000] font-semibold">Escort Included 🚓</p>
                        )}

                      </div>
                    </div>
                    <p
                      className={`p-1.5 rounded-full self-start px-3 text-xs sm:text-sm ${rec.bookingStatus === "assigned"
                        ? "bg-[#FEEFE7] text-[#F56212]"
                        : "bg-[#D2F6B0] text-[#4FA000]"
                        }`}
                    >
                      {rec.bookingStatus || "Pending"}
                    </p>
                  </div>

                  <hr className="text-gray-300" />

                  {/* Vehicle + Price */}
                  {/* Vehicle + Price */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm py-4 gap-2">
                    <div>
                      <p className="text-[#393E46] text-xs">Vehicle type</p>
                      <p>{rec.vehicle || "--"}</p>
                    </div>

                    {/* Clickable Price */}
                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <p className="text-[#4FA000] font-bold">
                          {rec.totalPrice && rec.totalPrice !== "-"
                            ? `₦${Number(rec.totalPrice).toLocaleString()}`
                            : "--"}
                        </p>

                        {/* View Account Button */}
                        {rec.totalPrice && Number(rec.totalPrice) > 0 && rec.paymentStatus !== "paid" && (
                          <button
                            onClick={() =>
                              setBookings((prev) =>
                                prev.map((b, i) =>
                                  i === idx ? { ...b, showAccount: !b.showAccount } : b
                                )
                              )
                            }
                            className="text-sm px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            {rec.showAccount ? "Hide Account" : "View Account"}
                          </button>
                        )}
                      </div>


                      {/* Slide-down Account Info (Only if NOT paid) */}
                      {/* Slide-down Account Info (Only if NOT paid and price exists) */}
                      {rec.showAccount && rec.paymentStatus !== "paid" && rec.totalPrice && Number(rec.totalPrice) > 0 && (
                        <div className="mt-2 bg-gray-100 border border-gray-300 rounded-lg p-3 animate-slide-down">
                          <p className="text-xs text-gray-700">
                            <span className="font-semibold">Account Name:</span> U-FLEX SHUTTLE SERVICES
                          </p>
                          <p className="text-xs text-gray-700">
                            <span className="font-semibold">Account No:</span>{" "}
                            <span className="text-green-600 font-bold">1013288276</span>
                          </p>
                          <p className="text-xs text-gray-700">
                            <span className="font-semibold">Bank Name:</span> KEYSTONE Bank
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1">Tap again to close</p>
                        </div>
                      )}


                    </div>
                  </div>


                  {/* Book Again Button */}
                  <div>
                    <ConfirmButton
                      {...getButtonState(rec)}
                      loading={loading}
                    />

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

      {showPolicy.open && (
        <ModalWrapper isOpen onClose={() => setShowPolicy({ open: false })}>
          <PolicyModal
            onAgree={() => handlePolicyAgree(showPolicy.bookingId!)}
            onClose={() => setShowPolicy({ open: false })}
          />
        </ModalWrapper>
      )}


      <Footer />
    </div>
  );
};

export default History;
