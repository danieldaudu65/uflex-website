import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest } from "../utils/api";
import { car_icon, arriw_right } from "../assets";
import toast from "react-hot-toast";
import PolicyModal from "../components/PolicyModal";
import ModalWrapper from "../components/modalParent";

const CurrentBooking: React.FC = () => {
  const { _id } = useParams();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [tracking, setTracking] = useState(false);

  const [showPolicy, setShowPolicy] = useState(false);


  const fetchBooking = async () => {
    try {
      const data = await apiRequest("/bookingController/booking/details", "POST", { bookingId: _id });
      if (data.success) {
        setBooking(data.data);
      } else {
        toast.error("Booking not found");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load booking");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
    const interval = setInterval(fetchBooking, 10000);
    return () => clearInterval(interval);
  }, [_id]);

  const handleConfirmPayment = async () => {
    if (!_id) return;
    setConfirming(true);
    toast.loading("Waiting for admin to confirm payment...");

    try {
      await apiRequest("/bookingController/confirm_payment", "POST", { bookingId: _id });

      toast.dismiss();
      toast.success("✅ Payment request sent! Tracking payment confirmation...");
      setTracking(true);
      startPaymentTracker();
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to send payment confirmation ❌");
    } finally {
      setConfirming(false);
    }
  };

  const startPaymentTracker = () => {
    const interval = setInterval(async () => {
      try {
        const data = await apiRequest("/bookingController/booking/details", "POST", { bookingId: _id });
        if (data.success) {
          const updated = data.data;
          setBooking(updated);
          if (updated.paymentStatus === "paid") {
            clearInterval(interval);
            setTracking(false);
            toast.dismiss();
            toast.success("✅ Payment confirmed by admin!");
          }
        }
      } catch (err) {
        console.error("Tracking error:", err);
      }
    }, 10000);
  };

  if (loading) return <p className="text-center mt-10">Loading booking details...</p>;
  if (!booking) return <p className="text-center mt-10">No booking found</p>;

  const hasValidPrice = booking.totalPrice && Number(booking.totalPrice) > 0;

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl min-h-[90vh] mx-auto mt-6 p-4">
        <div className="border border-gray-200 shadow-md rounded-2xl px-4 py-2 sm:p-4">
          {/* Booking Header */}
          <div className="flex flex-row items-center justify-between text-sm my-4 gap-3">
            <div className="flex items-start gap-3">
              <img src={car_icon} alt="" className="w-6 h-6" />
              <div className="space-y-1">
                <p className="capitalize font-medium">{booking.serviceType}</p>
                <div className="flex text-sm gap-2 flex-wrap items-center">
                  <p>{booking.pickupLocation}</p>
                  <img src={arriw_right} alt="" className="w-3 h-3" />
                  <p>{booking.dropoffLocation}</p>
                </div>
                <p className="text-[#7A7E83] text-xs">
                  {new Date(booking.bookingDate).toLocaleDateString()} — {booking.bookingTime}
                </p>
                {booking.is_excort && (
                  <p className="text-xs text-[#4FA000] font-semibold">Escort Included 🚓</p>
                )}
              </div>
            </div>

            <p
              className={`p-1.5 rounded-full self-start px-3 text-xs sm:text-sm ${booking.bookingStatus === "assigned"
                ? "bg-[#FEEFE7] text-[#F56212]"
                : booking.bookingStatus === "started"
                  ? "bg-[#FEF3C7] text-[#92400E]"
                  : booking.bookingStatus === "completed"
                    ? "bg-[#D2F6B0] text-[#4FA000]"
                    : "bg-gray-200 text-gray-700"
                }`}
            >
              {booking.bookingStatus || "Pending"}
            </p>
          </div>

          <hr className="text-gray-300" />

          {/* Vehicle + Price */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm py-4 gap-2">
            <div>
              <p className="text-[#393E46] text-xs">Vehicle type</p>
              <p>{booking.vehicle || "--"}</p>
            </div>

            <div className="text-right">
              <p className="text-[#4FA000] font-bold">
                {booking.totalPrice ? `₦${Number(booking.totalPrice).toLocaleString()}` : "--"}
              </p>
              <p className="text-xs text-[#7A7E83] capitalize">{booking.paymentStatus}</p>
            </div>
          </div>

          {/* ✅ Payment Account Details */}
          {hasValidPrice && booking.paymentStatus !== "paid" && (
            <div className="bg-[#F1FCE64D] border border-[#EBECED] p-4 rounded-xl my-4">
              <p className="text-sm text-gray-800 mb-2 font-semibold">Make Payment To:</p>
              <p>
                <span className="font-semibold text-gray-900">Account Name:</span>{" "}
                U-FLEX SHUTTLE SERVICES
              </p>
              <p>
                <span className="font-semibold text-gray-900">Account No:</span>{" "}
                <span className="text-green-main font-bold">1013288276</span>
              </p>
              <p>
                <span className="font-semibold text-gray-900">Bank Name:</span> KEYSTONE Bank
              </p>
            </div>
          )}

          {/* Rider Details */}
          {booking.rider && (
            <div className="mt-4 bg-gray-100 border border-gray-300 rounded-xl p-3">
              <p className="text-sm font-semibold mb-2">Assigned Rider 👨‍✈️</p>
              <p className="text-sm">
                Name: {booking.rider.firstName} {booking.rider.lastName}
              </p>
              <p className="text-sm">Email: {booking.rider.email}</p>
              <p className="text-sm">Phone: {booking.rider.phone || "--"}</p>
            </div>
          )}

          {/* Confirm Payment Button */}
          <div className="mt-6 text-center">
            {booking.paymentStatus === "paid" ? (
              <p className="text-green-600 font-semibold">✅ Payment Confirmed</p>
            ) : hasValidPrice ? (
              <button
                onClick={() => setShowPolicy(true)}
                disabled={confirming || tracking}
                className="bg-[#4FA000] text-white px-4 py-2 rounded-full hover:bg-[#3e7d00] disabled:opacity-60 transition"
              >
                {confirming
                  ? "Confirming..."
                  : tracking
                    ? "Waiting for Admin..."
                    : "Confirm Payment"}
              </button>

            ) : (
              <p className="text-sm text-gray-500">Awaiting fare update</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
      {showPolicy && (
        <ModalWrapper isOpen onClose={() => setShowPolicy(false)}>
          <PolicyModal
            onAgree={() => {
              setShowPolicy(false);
              handleConfirmPayment(); // call your confirm function here
            }}
            onClose={() => setShowPolicy(false)}
          />
        </ModalWrapper>
      )}

    </div>
  );
};

export default CurrentBooking;
