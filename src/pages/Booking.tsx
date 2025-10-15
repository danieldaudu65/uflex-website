import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Profile from '../components/Profile';
import RecentActivities from '../components/RecentActivities';
import { booking_ride, my_booking, support } from '../assets';
import { useNavigate } from 'react-router-dom';

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const linkPage = [
    {
      image: booking_ride,
      text: "Book a ride",
      disc: "Schedule your transportation",
      link: "book"
    },
    {
      image: my_booking,
      text: "My bookings",
      disc: "View your trips",
      link: "history"
    },
    {
      image: support,
      text: "Contact support",
      disc: "Get help anytime",
      link: "contact"
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="p-4 lg:p-8 lg:min-h-[80vh] lg:px-16">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left side: Profile + Links */}
          <div className="lg:col-span-1 space-y-4">
            <Profile />

            <div className="my-4 gap-4 grid">
              {linkPage.map((link, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(`${link.link}`)}
                  className="bg-[#F1FCE6] border flex justify-start gap-4 border-[#4FA000] p-4 rounded-xl cursor-pointer hover:shadow-md transition-all duration-200"
                >
                  <img src={link.image} alt="" className="w-10 h-10 object-contain" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{link.text}</p>
                    <p className="text-xs text-[#61656B]">{link.disc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Recent activities */}
          <div className="lg:col-span-2">
            <RecentActivities />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;
