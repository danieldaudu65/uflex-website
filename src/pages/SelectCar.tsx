import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { arrow_left, car_icon } from "../assets";
import { useNavigate } from "react-router-dom";

interface CarType {
  car: string;
  amount?: string;
}

const SelectCar: React.FC = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState("");

  const cartyp: CarType[] = [
    { car: "Range Rover" },
    { car: "Pathfinder" },
    { car: "Toyota Camry" },
    { car: "Range Rover (Luxury)" },
  ];

  const handleSelectCar = (car: CarType) => {
    const bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");

    const finalBooking = {
      ...bookingData,
      vehicle: car.car,
      totalPrice: "-", // placeholder for now
      notes: note,
    };

    localStorage.setItem("bookingData", JSON.stringify(finalBooking));
    navigate("payment");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="p-4 md:p-8 flex-grow flex justify-center">
        <div className="w-full md:max-w-2xl lg:max-w-3xl">
          {/* Header */}
          <div className="flex mb-6 justify-between items-center">
            <img
              src={arrow_left}
              onClick={() => navigate(-1)}
              alt="back"
              className="cursor-pointer w-6 md:w-7"
            />
            <div>
              <h3 className="text-lg md:text-xl font-extrabold">
                Pick your Car Type
              </h3>
              <p className="text-[10px] md:text-xs text-[#F78141]">Step 2/3</p>
            </div>
          </div>

          {/* Car Types */}
          <div className="border border-gray-200 p-4 md:p-6 mb-4 rounded-xl">
            <p className="text-sm md:text-base font-medium">Car Type</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4 my-3">
              {cartyp.map((car, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectCar(car)}
                  className="hover:border-[#4FA000] cursor-pointer flex gap-3 md:gap-4 items-start p-4 rounded-xl border border-[#EBECED] bg-[#F1FCE64D] hover:shadow-md transition-all"
                >
                  <img src={car_icon} alt={car.car} className="w-8 md:w-10" />
                  <div className="space-y-1">
                    <p className="text-sm md:text-base font-medium">
                      {car.car}
                    </p>
                    <p className="text-[#3D7C00] text-xs md:text-sm">-</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Note */}
          <div className="border border-gray-200 p-4 md:p-6 rounded-xl">
            <label className="text-sm md:text-base font-medium mb-2 block">
              Additional Note
            </label>
            <textarea
              placeholder="Write any special request or additional details..."
              className="w-full border border-gray-200 p-2 md:p-3 rounded-md text-sm md:text-base placeholder:text-xs outline-green-main hover:border-green-main"
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SelectCar;
