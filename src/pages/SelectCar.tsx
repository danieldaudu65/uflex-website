import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { arrow_left, car_icon } from "../assets";
import { useNavigate } from "react-router-dom";

interface CarType {
    car: string;
    amount: string;
}

const SelectCar: React.FC = () => {
    const cartyp: CarType[] = [
        {
            car: "Range Rover",
            amount: "25,000",
        },
        {
            car: "Pathfinder",
            amount: "18,000",
        },
        {
            car: "Toyota Camry",
            amount: "15,000",
        },
        {
            car: "Range Rover",
            amount: "40,000",
        },
    ];

    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
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
                        <h3 className="text-lg font-extrabold">Pick your Car Type</h3>
                        <p className="text-[10px] text-[#F78141]">Step 1/3</p>
                    </div>
                </div>

                {/* Car Types */}
                <div className="border border-gray-200 p-4 mb-4">
                    <p className="text-sm">Car type</p>
                    <div className="grid my-3 gap-2">
                        {cartyp.map((car, idx) => (
                            <div
                                key={idx}
                                className="hover:border-[#4FA000] flex gap-3 items-start p-4 rounded-xl border border-[#EBECED] bg-[#F1FCE64D]"
                            >
                                <img src={car_icon} alt={car.car} />
                                <div className="space-y-1">
                                    <p className="">{car.car}</p>
                                    <p className="text-[#3D7C00] text-xs">₦{car.amount} per day</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Note */}
                <div className="border border-gray-200 p-4 rounded-xl">
                    <label className="text-sm font-medium mb-1 block">Additional Note</label>
                    <textarea
                        placeholder="Write any special request or additional details..."
                        className="w-full border border-gray-200 p-2 rounded-md text-sm placeholder:text-xs outline-green-main hover:border-green-main"
                        rows={3}
                    ></textarea>
                </div>
                <button
                    onClick={() => navigate("payment")}
                    className="bg-[#65CE00] font-bold text-black w-full py-3 rounded-lg"
                >
                    Next Step
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default SelectCar;
