import React from "react";

const PremuimServiceTrave:React.FC = () => {
  const travel = [
    {
      title: "Executive Airport Transfers",
      details:
        "Arrive in style and on schedule with our private luxury vehicles and professional drivers. We make sure your first impression is your best one.",
    },
    {
      title: "Security Escorts",
      details:
        "Your safety and discretion are our priority. Our trained security personnel provide trusted protection every step of the way.",
    },
    {
      title: "Corporate Travel Management",
      details:
        "From delegations to conferences, we coordinate transportation for teams of any size, ensuring timeliness and efficiency.",
    },
    {
      title: "Hotel & Meeting Assistance",
      details:
        "Beyond transport, we help you settle in with concierge support for hotel check-ins, meeting rooms, and business centers.",
    },
    {
      title: "Confidential & Reliable",
      details:
        "We respect your need for privacy. Our services are designed with international executives in mind—whether you’re arriving from the U.S., Canada, Europe, or beyond.",
    },
  ];

  return (
    <div className="px-4 md:px-12 lg:px-24 py-12 bg-white">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl text-green-main md:text-4xl font-extrabold mb-4 text-gray-900 leading-tight">
          Our Premium Services <br className="hidden md:block" />
          <span className="">for Business Travelers</span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          At Uflex Shuttle Service, we know that time, safety, and comfort
          matter most when you travel for business. Our tailored solutions
          ensure every trip is smooth—from airport arrivals to boardroom
          meetings.
        </p>
      </div>

      {/* Travel Service List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {travel.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
          >
            <h3 className="text-lg text-green-main font-bold mb-3 text-gray-900">
              {item.title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {item.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremuimServiceTrave;
