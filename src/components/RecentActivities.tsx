import React, { useEffect, useState } from "react";
import { arriw_right, car_icon } from "../assets";
import { toast } from "react-hot-toast";
import { apiRequest } from "../utils/api";

const RecentActivities: React.FC = () => {
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchUserBookings();
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Loading...</p>;
  if (recentBookings.length === 0)
    return <p className="text-sm text-gray-500">No recent bookings yet.</p>;

  return (
    <div>
      <p className="py-3 text-[13px] font-semibold">Recent activity</p>

      {/* ✅ Responsive grid (1 on mobile, 2 on md, 3 on lg) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recentBookings.map((rec, idx) => (
          <div
            key={idx}
            className="border border-gray-200 shadow-md rounded-2xl px-4 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between text-sm my-4">
              <img src={car_icon} alt="car" />
              <div className="space-y-1 flex-1 px-2">
                <p className="font-medium">{rec.serviceType}</p>
                <div className="flex text-sm gap-2 items-center flex-wrap">
                  <p className="truncate max-w-[100px] md:max-w-[140px]">{rec.pickupLocation}</p>
                  <img src={arriw_right} alt="arrow" className="w-4 h-4" />
                  <p className="truncate max-w-[100px] md:max-w-[140px]">{rec.dropoffLocation}</p>
                </div>
                <p className="text-[#7A7E83]">
                  {rec.bookingDate
                    ? new Date(rec.bookingDate).toLocaleDateString()
                    : ""}
                  {rec.bookingTime ? ` — ${rec.bookingTime}` : ""}
                </p>
              </div>
              <p
                className={`p-1.5 rounded-full px-3 ${
                  rec.status === "Assigned"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
