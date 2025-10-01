import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { arrow_left, car_icon, send, success } from "../assets";
import ModalWrapper from "../components/modalParent";

const PaymentPage: React.FC = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState<boolean>(false);

    return (
        <div>
            <Navbar />
            <div className="p-4 min-h-[80vh]">
                {/* Header */}
                <div className="flex mb-6 justify-between items-center">
                    <img
                        src={arrow_left}
                        onClick={() => navigate(-1)}
                        alt="back"
                        className="cursor-pointer"
                    />
                    <div>
                        <h3 className="text-lg font-extrabold">Make Payment</h3>
                        <p className="text-[10px] text-[#F78141]">Step 3/3</p>
                    </div>
                </div>

                {/* Payment Card */}
                <div className="border mb-6 border-green-main p-4 rounded-md cursor-pointer hover:border-green-main flex flex-col justify-between items-start gap-6">
                    <img src={send} alt="send" />
                    <div className="flex justify-between w-full">
                        <div>
                            <p className="font-bold">Transfer</p>
                            <div className="flex items-center text-[#393E46] text-xs gap-1.5">
                                <p>Pathfinder</p>
                                <img src={car_icon} alt="car" />
                            </div>
                        </div>
                        <div>
                            <p className="font-bold">₦18,000</p>
                            <p className="text-[10px] text-[#7A7E83]">Per day</p>
                        </div>
                    </div>
                </div>

                {/* Confirm Payment Button */}
                <button
                    onClick={() => setModal(true)}
                    className="bg-[#65CE00] font-bold text-black w-full py-3 rounded-lg"
                >
                    Confirm Payment
                </button>
            </div>

            {/* Modal */}
            {modal && (
                <ModalWrapper isOpen onClose={() => setModal(false)}>
                    <div className="bg-white flex flex-col  p-6 rounded-lg shadow-md w-[90%] max-w-md m-auto text-center">
                        <img src={success} alt="" className="w-20 h-20 flex justify-center items-center m-auto mb-8" />
                        <h2 className="text-lg font-extrabold mb-2">Payment Made</h2>
                        <p className="text-md text-gray-600 mb-6 px-16">
                            You have succesfully booked your ride!
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setModal(false)}
                                className="flex-1 border border-gray-300 rounded-lg py-2 text-sm"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="flex-1 bg-[#65CE00] text-black font-bold rounded-lg py-2 text-sm"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </ModalWrapper>
            )}

            <Footer />
        </div>
    );
};

export default PaymentPage;
