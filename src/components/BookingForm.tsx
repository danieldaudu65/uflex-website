import React, { useState } from "react";
import { arrow_left } from "../assets";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // icons for arrow toggle

interface Service {
    value: string;
    label: string;
}

const BookingForm: React.FC = () => {
    const navigate = useNavigate();
    const [serviceType, setServiceType] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [otherService, setOtherService] = useState<string>("");

    const services: Service[] = [
        { value: "airport-pickup", label: "Airport Pickup" },
        { value: "airport-dropoff", label: "Airport Drop-off" },
        { value: "car-rental", label: "Car Rental" },
        { value: "security-escort", label: "Security Escort" },
        { value: "other", label: "Other" },
    ];

    const handleSelect = (value: string) => {
        setServiceType(value);
        setIsOpen(false);
    };

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex mb-6 justify-between items-center">
                <img
                    src={arrow_left}
                    onClick={() => navigate(-1)}
                    alt="back"
                    className="cursor-pointer"
                />
                <div>
                    <h3 className="text-lg font-extrabold">Book a Ride</h3>
                    <p className="text-[10px] text-[#F78141]">Step 1/3</p>
                </div>
            </div>

            {/* Locations */}
            <div className="p-4 py-6 mb-3 rounded-xl border border-gray-200">
                {/* Pickup */}
                <div className="flex flex-col text-sm relative mb-4">
                    <label className="font-medium mb-1">Pickup Location</label>
                    <input
                        type="text"
                        placeholder="Search Pickup Location"
                        className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
                        id="pickup-location"
                    />
                </div>

                {/* Drop-off */}
                <div className="flex flex-col text-sm relative mb-4">
                    <label className="font-medium mb-1">Drop-off Location</label>
                    <input
                        type="text"
                        placeholder="Enter Drop-off Location"
                        className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
                    />
                </div>
            </div>

            {/* Date & Time */}
            <div className="p-4 py-6 mb-3 rounded-xl border border-gray-200">
                <div className="flex gap-4 w-full">
                    {/* Date */}
                    <div className="flex w-1/2 flex-col text-sm relative mb-4">
                        <label className="font-medium mb-1">Date</label>
                        <input
                            type="date"
                            className="border outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
                        />
                    </div>

                    {/* Time */}
                    <div className="flex w-1/2 flex-col text-sm relative mb-4">
                        <label className="font-medium mb-1">Time</label>
                        <input
                            type="time"
                            className="border outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
                        />
                    </div>
                </div>
            </div>

            {/* Service Type */}
            <div className="p-4 py-6 mb-3 rounded-xl border border-gray-200 relative">
                <label className="font-medium mb-1 text-sm ">Service Type</label>

                {/* Selected Display with Arrow */}
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

                {/* Dropdown */}
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

                {/* If "Other" is selected */}
                {serviceType === "other" && (
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

            <button
                onClick={() => navigate("cartype")}
                className="bg-[#65CE00] font-bold text-black w-full py-3 rounded-lg"
            >
                Next Step
            </button>

            {/* Animations */}
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
