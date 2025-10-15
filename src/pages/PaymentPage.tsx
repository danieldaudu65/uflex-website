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

const PaymentPage: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

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
    return { label: "Confirm Payment", action: handleConfirmPayment, disabled: loading };
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
      <Footer />
    </div>
  );
};

export default PaymentPage;
