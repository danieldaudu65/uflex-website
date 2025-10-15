import React, { useEffect, useState } from "react";
import { arrow_left } from "../assets";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Service {
  value: string;
  label: string;
}

const BookingForm: React.FC = () => {
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [otherService, setOtherService] = useState<string>("");

  // form states
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const [isEscort, setIsEscort] = useState<boolean>(false);
  // 🧹 Clear booking data when form loads fresh
  useEffect(() => {
    // localStorage.removeItem("bookingData");
    localStorage.removeItem('createdBooking');

  }, []);

  const handleNext = () => {
    if (
      !pickupLocation ||
      !dropoffLocation ||
      !bookingDate ||
      !bookingTime ||
      !serviceType
    ) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const bookingData = {
      pickupLocation,
      dropoffLocation,
      bookingDate,
      bookingTime,
      serviceType: serviceType === "others" ? otherService : serviceType,
      firstName: user?.firstName,
      userEmail: user?.email,
      is_excort: isEscort,
    };

    // ✅ Save only when user clicks next
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    navigate("cartype");
  };

  const services: Service[] = [
    { value: "airport_pickup", label: "Airport Pickup" },
    { value: "airport_dropoff", label: "Airport Drop-off" },
    { value: "car_rental", label: "Car Rental" },
    { value: "others", label: "Other" },
  ];

  const handleSelect = (value: string) => {
    setServiceType(value);
    setIsOpen(false);
  };

  return (
    <div className="p-4 md:p-8 flex justify-center">
      {/* Center form for desktop */}
      <div className="w-full md:max-w-2xl lg:max-w-3xl">
        {/* Header */}
        <div className="flex mb-6 justify-between items-center">
          <img
            src={arrow_left}
            onClick={() => navigate(-1)}
            alt="back"
            className="cursor-pointer"
          />
          <div>
            <h3 className="text-lg md:text-xl font-extrabold">Book a Ride</h3>
            <p className="text-[10px] md:text-xs text-[#F78141]">Step 1/3</p>
          </div>
        </div>

        {/* Pickup & Dropoff */}
        <div className="p-4 py-6 mb-3 rounded-xl border border-gray-200">
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-6 text-sm">
            <div className="flex flex-col mb-4 md:mb-0">
              <label className="font-medium mb-1">Pick-Up Location</label>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="Search Pickup Location"
                className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Drop-off Location</label>
              <input
                type="text"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                placeholder="Enter Drop-off Location"
                className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="p-4 py-6 mb-3 rounded-xl border border-gray-200">
          <div className="flex flex-col md:flex-row md:gap-6 text-sm">
            <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0">
              <label className="font-medium mb-1">Date</label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="border outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
              />
            </div>

            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-medium mb-1">Time</label>
              <input
                type="time"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="border outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Service Type */}
        <div className="p-4 py-6 mb-3 rounded-xl border border-gray-200 relative">
          <label className="font-medium mb-1 text-sm">Service Type</label>

          <div
            className="border border-gray-200 p-2 rounded-md cursor-pointer hover:border-green-main flex justify-between items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-[#A4A6AA] text-xs">
              {serviceType
                ? services.find((s) => s.value === serviceType)?.label
                : "Select Service"}
            </span>
            {isOpen ? (
              <FaChevronUp className="text-gray-500 text-xs" />
            ) : (
              <FaChevronDown className="text-gray-500 text-xs" />
            )}
          </div>


          {isOpen && (
            <div className="absolute left-0 right-0 mt-2 mx-4 p-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 animate-slideDown">
              {services.map((s) => (
                <div
                  key={s.value}
                  className="p-2 text-xs hover:bg-[#D2F6B0] cursor-pointer"
                  onClick={() => handleSelect(s.value)}
                >
                  {s.label}
                </div>
              ))}
            </div>
          )}

          {serviceType === "others" && (
            <div className="flex flex-col text-sm relative mt-4">
              <label className="font-medium text-[#A4A6AA] mb-1">
                Specify Service
              </label>
              <input
                type="text"
                placeholder="Enter service type"
                className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
                value={otherService}
                onChange={(e) => setOtherService(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="p-4 py-4 mb-3 rounded-xl border border-gray-200 flex items-center gap-3">
          <input
            type="checkbox"
            id="escort"
            checked={isEscort}
            onChange={(e) => setIsEscort(e.target.checked)}
            className="w-4 h-4 accent-green-600 cursor-pointer"
          />
          <label htmlFor="escort" className="text-sm font-medium text-gray-700 cursor-pointer">
            I would like to request a Security Escort
          </label>
        </div>

        <button
          onClick={handleNext}
          className="bg-[#65CE00] font-bold text-black w-full py-3 rounded-lg"
        >
          Next Step
        </button>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideDown {
            animation: slideDown 0.2s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default BookingForm;
