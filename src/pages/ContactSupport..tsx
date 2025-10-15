import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { arrow_left, mailc, support, whatsappC } from "../assets";
import { useNavigate } from "react-router-dom";

interface SupportOption {
  title: string;
  description: string;
  contacts: string[];
  image: any;
}

const ContactSupport: React.FC = () => {
  const navigate = useNavigate();

  const supportOptions: SupportOption[] = [
    {
      title: "Speak",
      description: "Speak directly with our team",
      contacts: ["+234 707375792", "+234 8112159041"],
      image: support,
    },
    {
      title: "WhatsApp",
      description: "Chat with us on WhatsApp",
      contacts: ["+234 8023345567"],
      image: whatsappC,
    },
    {
      title: "Email",
      description: "Send us a quick email",
      contacts: ["support@example.com"],
      image: mailc,
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="p-4 sm:p-6 md:p-10 min-h-[90vh]">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <img
              src={arrow_left}
              onClick={() => navigate(-1)}
              alt="back"
              className="cursor-pointer w-5 sm:w-6"
            />
            <h3 className="text-lg sm:text-xl font-semibold">Contact Support</h3>
          </div>

          {/* Support Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportOptions.map((option, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start gap-3 border border-gray-200 p-4 rounded-xl hover:border-green-500 transition-all duration-200"
              >
                <img
                  src={option.image}
                  alt={option.title}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                />
                <div className="space-y-1">
                  <p className="font-semibold text-base sm:text-lg">
                    {option.title}
                  </p>
                  <p className="text-[#61656B] text-sm">{option.description}</p>
                  <div className="text-[#61656B] text-xs sm:text-sm">
                    {option.contacts.map((c, i) => (
                      <p key={i}>{c}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactSupport;
