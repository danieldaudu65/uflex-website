import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { arrow_left } from "../assets";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Sample images (import yours)
import { sienna, camry, corrola, nissan, lexus, rangerover, LexusJeep, pado } from "../assets";

interface Car {
  name: string;
  image: string;
}

interface Category {
  id: number;
  name: string;
  cars: Car[];
}

const SelectCar: React.FC = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [selectedCar, setSelectedCar] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: 1,
      name: "Budget-Friendly",
      cars: [
        { name: "Toyota Sienna", image: sienna },
        { name: "Toyota Camry", image: camry },
        { name: "Toyota Corolla", image: corrola },
      ],
    },
    {
      id: 2,
      name: "Premium",
      cars: [
        { name: "Nissan Pathfinder", image: nissan },
        { name: "Lexus ES330", image: lexus },
      ],
    },
    {
      id: 3,
      name: "VIP Luxury",
      cars: [
        { name: "Range Rover Jeep", image: rangerover },
        { name: "Lexus RS350 Jeep", image: LexusJeep },
        { name: "Toyota Land Cruiser Prado", image: pado },
      ],
    },
  ];

  const handleSelectCar = (car: Car) => {
    setSelectedCar(car.name);

    const bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");
    const finalBooking = {
      ...bookingData,
      vehicle: car.name,
      totalPrice: "-",
      notes: note,
    };
    localStorage.setItem("bookingData", JSON.stringify(finalBooking));

    toast.success(`${car.name} selected`);
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

          {/* Car Categories */}
          {categories.map((category) => (
            <div
              key={category.id}
              className="border border-gray-200 p-4 md:p-6 mb-6 rounded-xl"
            >
              <p className="text-sm md:text-base font-semibold mb-3">
                {category.name}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.cars.map((car, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectCar(car)}
                    className={`cursor-pointer flex gap-3 items-center p-4 rounded-xl border transition-all 
                      ${
                        selectedCar === car.name
                          ? "border-[#4FA000] bg-[#F1FCE64D]"
                          : "border-[#EBECED] bg-[#F9FAFB]"
                      }`}
                  >
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-10 h-10 object-contain rounded-md"
                    />
                    <p className="text-sm md:text-base font-medium">{car.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

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
