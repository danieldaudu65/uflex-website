import React from "react";
import ModalWrapper from "./modalParent";
import { success } from "../assets";

interface Props {
  onClose: () => void;
}

const BookingSuccessModal: React.FC<Props> = ({ onClose }) => {
  return (
    <ModalWrapper isOpen onClose={onClose}>
      <div className="bg-white flex flex-col p-6 rounded-lg shadow-md w-[90%] max-w-md m-auto text-center">
        <img src={success} alt="success" className="w-20 h-20 mx-auto mb-6" />
        <h2 className="text-lg font-extrabold mb-2">Booking Created</h2>
        <p className="text-md text-gray-600 mb-6 px-6">
          Your booking is pending price confirmation from admin.
          <br />You’ll be notified once the price is added.
        </p>
        <button
          onClick={onClose}
          className="bg-[#65CE00] text-black font-bold rounded-lg py-2 text-sm"
        >
          Okay
        </button>
      </div>
    </ModalWrapper>
  );
};

export default BookingSuccessModal;
