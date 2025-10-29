import React, { useEffect, useState } from "react";
import { arriw_right, car_icon } from "../assets";
import { toast } from "react-hot-toast";
import { apiRequest } from "../utils/api";
import PolicyModal from "./PolicyModal"; // ✅ Import modal
import ModalWrapper from "./modalParent";

const RecentActivities: React.FC = () => {
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmingPaymentIds, setConfirmingPaymentIds] = useState<string[]>([]);
  const [showPolicy, setShowPolicy] = useState<{ open: boolean; bookingId?: string }>({ open: false });

  const fetchUserBookings = async () => {
    try {
      const data = await apiRequest("/bookingController/bookings/user", "GET");
      setRecentBookings(data.bookings || []);
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load recent bookings");
    } finally {
      setLoading(false);
    }
  };

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

  const getButtonState = (rec: any) => {
    const price = parseFloat(rec?.totalPrice);

    if (rec.bookingStatus === "completed") return null;
    if (confirmingPaymentIds.includes(rec._id)) {
      return { label: "Payment Confirming...", onClick: () => { }, disabled: true };
    }
    if (rec.paymentStatus === "paid") {
      return { label: "Payment Confirmed ✅", onClick: () => { }, disabled: true };
    }
    if (rec.bookingStatus === "started") {
      return { label: "Ongoing Ride 🚗", onClick: () => { }, disabled: true };
    }
    if (!price || price <= 0) {
      return { label: "Pending Payment", onClick: () => { }, disabled: true };
    }

    // ✅ Instead of confirming directly, show policy modal
    return {
      label: "Confirm Payment",
      onClick: () => setShowPolicy({ open: true, bookingId: rec._id }),
      disabled: false,
    };
  };

  useEffect(() => {
    const interval = setInterval(fetchUserBookings, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Loading...</p>;
  if (recentBookings.length === 0)
    return <p className="text-sm text-gray-500">No recent bookings yet.</p>;

  return (
    <div>
      <p className="py-3 text-[13px] font-semibold">Recent activity</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recentBookings.map((rec, idx) => {
          const button = getButtonState(rec);
          const showAccountDetails =
            rec.totalPrice &&
            Number(rec.totalPrice) > 0 &&
            rec.paymentStatus !== "paid";

          return (
            <div
              key={idx}
              className="border border-gray-200 shadow-md rounded-2xl px-4 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between text-sm my-4">
                <img src={car_icon} alt="car" />
                <div className="space-y-1 flex-1 px-2">
                  <p className="font-medium">{rec.serviceType}</p>
                  <div className="flex text-sm gap-2 items-center flex-wrap">
                    <p className="truncate max-w-[100px] md:max-w-[140px]">
                      {rec.pickupLocation}
                    </p>
                    <img src={arriw_right} alt="arrow" className="w-4 h-4" />
                    <p className="truncate max-w-[100px] md:max-w-[140px]">
                      {rec.dropoffLocation}
                    </p>
                  </div>
                  <p className="text-[#7A7E83]">
                    {rec.bookingDate
                      ? new Date(rec.bookingDate).toLocaleDateString()
                      : ""}
                    {rec.bookingTime ? ` — ${rec.bookingTime}` : ""}
                  </p>
                </div>
                <p
                  className={`p-1.5 rounded-full px-3 ${rec.status === "Assigned"
                    ? "bg-[#FEEFE7] text-[#F56212]"
                    : rec.bookingStatus === "completed"
                      ? "bg-[#E7F8E7] text-[#4FA000]"
                      : "bg-[#EEE] text-[#555]"
                    }`}
                >
                  {rec.bookingStatus || "Pending"}
                </p>
              </div>

              <hr className="text-gray-300" />

              <div className="flex justify-between text-sm p-1.5 py-6">
                <div>
                  <p className="text-[#393E46] text-xs">Vehicle type</p>
                  <p>{rec.vehicle}</p>
                </div>
                <p className="text-[#4FA000] font-bold">
                  {rec.totalPrice && !isNaN(Number(rec.totalPrice))
                    ? `₦${Number(rec.totalPrice).toLocaleString()}`
                    : "--"}
                </p>
              </div>

              {/* ✅ Show Account Details */}
              {showAccountDetails && (
                <div className="bg-gray-100 border border-gray-300 rounded-xl p-3 mb-3 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold text-gray-900">
                      Account Name:
                    </span>{" "}
                    U-FLEX SHUTTLE SERVICES
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">
                      Account No:
                    </span>{" "}
                    <span className="text-green-main font-bold">1013288276</span>
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">
                      Bank Name:
                    </span>{" "}
                    KEYSTONE Bank
                  </p>
                </div>
              )}

              {/* ✅ Confirm Payment Button */}
              {button && (
                <div className="flex justify-end my-2">
                  <button
                    onClick={button.onClick}
                    disabled={button.disabled}
                    className={`px-3 py-1 rounded-xl text-sm ${button.disabled
                      ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                      : "bg-[#4FA000] text-white hover:bg-green-600"
                      }`}
                  >
                    {button.label}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ✅ Refund & Cancellation Policy Modal */}

      {showPolicy.open && (
        <ModalWrapper isOpen onClose={() => setShowPolicy({ open: false })}>

          <PolicyModal
            onAgree={() => handlePolicyAgree(showPolicy.bookingId!)}
            onClose={() => setShowPolicy({ open: false })}
          />
        </ModalWrapper>
      )}
    </div>
  );
};

export default RecentActivities;
