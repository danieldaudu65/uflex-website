import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LogoLoader from "../components/LogoLoader";
import PaymentHeader from "../components/PaymentHeader";
import PaymentCard from "../components/PaymentCard";
import ConfirmButton from "../components/ConfirmButton";
import BookingSuccessModal from "../components/BookingSuccessModal";
import { apiRequest } from "../utils/api";
import { toast } from "react-hot-toast";
import ModalWrapper from "../components/modalParent";

const PaymentPage: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const [showPolicy, setShowPolicy] = useState(false);
  const [agreed, setAgreed] = useState(false);


  const storedBooking = localStorage.getItem("bookingData");
  const bookingData = storedBooking ? JSON.parse(storedBooking) : null;

  // ✅ Confirm Payment Flow
  const handleConfirmPayment = async () => {
    try {
      setLoading(true);
      toast.loading("Confirming your payment...");
      setConfirming(true);

      // Step 1: Confirm payment
      await apiRequest("/bookingController/confirm_payment", "POST", {
        bookingId: booking?._id,
      });

      // Step 2: Check status every 10s
      let checkInterval: ReturnType<typeof setInterval>;
      let elapsed = 0;

      const checkStatus = async () => {
        try {
          const res = await apiRequest(
            "/bookingController/check_payment_status",
            "POST",
            { bookingId: booking?._id }
          );

          if (res.paymentStatus === "paid") {
            clearInterval(checkInterval);
            toast.dismiss();
            toast.success("✅ Payment confirmed successfully!");
            setConfirming(false);
            setBooking({ ...booking, paymentStatus: "paid" });

            // 🕒 Wait 20 seconds before redirecting
            setTimeout(() => {
              toast("Redirecting to your bookings page...");
              window.location.href = "/booking";
            }, 20000);
          } else {
            elapsed += 10;
            if (elapsed >= 1200) {
              // stop after 2 minutes
              clearInterval(checkInterval);
              toast.dismiss();
              toast.error("Payment not yet confirmed. Please try again later.");
              setConfirming(false);
            }
          }
        } catch (error) {
          console.error("Error checking payment status:", error);
        }
      };

      checkInterval = setInterval(checkStatus, 10000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to confirm payment ❌");
      setConfirming(false);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create Booking
  const handleConfirmBooking = async () => {
    setLoading(true);
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const payload = {
      ...bookingData,
      userEmail: user?.email,
      firstName: user?.firstName,
      phone_no: user?.phone_no || "",
    };

    try {
      const data = await apiRequest(
        "/bookingController/create_booking",
        "POST",
        payload
      );
      localStorage.setItem("createdBooking", JSON.stringify(data.booking));
      setBooking(data.booking);
      setTimeout(() => {
        setModal(true);
        toast.success("Booking created successfully ✅");
      }, 1500);
    } catch (error) {
      toast.error("Failed to create booking ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto-refresh booking
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const loadBooking = async () => {
      const saved = localStorage.getItem("createdBooking");
      const existing = saved ? JSON.parse(saved) : bookingData;
      if (!existing?._id) return;

      try {
        const data = await apiRequest(
          "/bookingController/refresh_booking",
          "POST",
          { bookingId: existing._id }
        );
        setBooking(data.data);

        // 🛑 stop auto-refresh if price is set
        if (data.data?.totalPrice > 0) {
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Fetch booking error:", error);
      }
    };

    loadBooking();
    interval = setInterval(loadBooking, 10000);

    return () => clearInterval(interval);
  }, [modal]);

  // ✅ Button states
  const getButtonState = () => {
    if (!booking?._id)
      return { label: "Confirm Booking", action: handleConfirmBooking, disabled: false };
    const price = parseFloat(booking?.totalPrice);
    if (isNaN(price) || price <= 0)
      return { label: "Pending Payment", action: () => { }, disabled: true };
    if (confirming)
      return { label: "Confirming...", action: () => { }, disabled: true };
    if (booking?.paymentStatus === "paid")
      return { label: "Payment Confirmed ✅", action: () => { }, disabled: true };

    // 🔹 Instead of directly calling payment, open policy first
    return { label: "Confirm Payment", action: () => setShowPolicy(true), disabled: loading };
  };


  const { label, action, disabled } = getButtonState();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <LogoLoader isLoading={loading} />
      <div className="flex-1 flex justify-center">
        <div className="p-4 w-full max-w-2xl min-h-[80vh]">
          <PaymentHeader />
          <PaymentCard
            vehicle={booking?.vehicle}
            totalPrice={booking?.totalPrice}
            accountNumber={booking?.accountNumber}
          />
          <ConfirmButton
            label={label}
            onClick={action}
            disabled={disabled}
            loading={loading}
          />
        </div>
      </div>
      {modal && <BookingSuccessModal onClose={() => setModal(false)} />}
      {showPolicy && (
        <ModalWrapper isOpen onClose={() => setShowPolicy(false)}>

          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
              <h2 className="text-lg font-semibold mb-3">Refund and Cancellation Policy</h2>
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2 mb-4">
                <li>Refund and cancellation requests are valid only within 72 hours of booking.</li>
                <li>Cancellations made after the 72-hour window are not eligible for a refund.</li>
                <li>Clients who cancel within the validity period may reschedule their trip(s) within two (2) weeks from the date of cancellation.</li>
                <li>Clients who fail to reschedule within these two weeks will incur a 25% administrative fee, which will be deducted from the initial payment. The remaining balance will then be refunded to the client.</li>
              </ul>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="agree" className="text-sm">I agree to the policy terms above</label>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowPolicy(false)}
                  className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  disabled={!agreed}
                  onClick={() => {
                    setShowPolicy(false);
                    handleConfirmPayment();
                  }}
                  className={`px-4 py-2 text-sm rounded text-white ${agreed ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                  Continue
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

export default PaymentPage;
