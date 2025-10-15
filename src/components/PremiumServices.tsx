import React from "react";
import { premiumServiceDetiail } from "../data/PremiumServices";

const PremiumServices:React.FC = () => {
    return (
        <div className="px-4 md:px-12 lg:px-24 py-12 bg-white">
            {/* Heading Section */}
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h3 className="text-2xl text-green-main md:text-4xl font-extrabold mb-4 text-gray-900 leading-tight">
                    Our Premium Services <br className="hidden md:block" />
                    <span className="">for Business Travelers</span>
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    At Uflex Shuttle Service, we know that time, safety, and comfort
                    matter most when you travel for business. Our tailored solutions
                    ensure every trip is smooth — from airport arrivals to boardroom
                    meetings.
                </p>
            </div>

            {/* Premium Cards */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {premiumServiceDetiail.map((prem, idx) => (
                    <div
                        key={idx}
                        className="border flex justify-between flex-col rounded-2xl border-gray-300  shadow-lg hover:shadow-md hover:scale-[1.02] transition-all duration-300 bg-gray-50"
                    >
                        <img
                            src={prem.image}
                            alt={prem.model}
                            className="w-full  object-cover rounded-t-2xl"
                        />

                        <div className="p-3">
                            <div className="">

                                <h2 className="text-lg  text-green-main mb-2 font-bold text-gray-900">
                                    {prem.title}
                                </h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    {prem.model} ({prem.year})
                                </p>

                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>
                                        <strong>Passengers:</strong> {prem.passenger}
                                    </li>
                                    <li>
                                        <strong>Luggage Capacity:</strong> {prem.LuggageCapacity}
                                    </li>
                                    <li>
                                        <strong>Timely Pickup:</strong> ₦{prem.timelyPickup}
                                    </li>
                                    <li>
                                        <strong>Full Day:</strong> ₦{prem.fullDay}
                                    </li>
                                    <li>
                                        <strong>Additional Hour:</strong> ₦{prem.additionalHour}
                                    </li>
                                    <li>
                                        <strong>Airport Transfer:</strong> ₦{prem.airportTransfer}
                                    </li>
                                </ul>

                            </div>
                            <button className="lg:w-1/2 py-2 rounded-lg  mb-6 w-full mt-3   bg-green-main  ">Book Now </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PremiumServices;
