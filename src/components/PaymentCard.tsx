import React from "react";
import { car_icon, send } from "../assets";

interface Props {
  vehicle: string;
  totalPrice: number | string;
  accountNumber?: string;
}

const PaymentCard: React.FC<Props> = ({ vehicle, totalPrice, accountNumber }) => {
  const parsedPrice = parseFloat(totalPrice as string);
  const hasValidPrice = !isNaN(parsedPrice) && parsedPrice > 0;

  const displayPrice = () =>
    hasValidPrice ? `₦${parsedPrice.toLocaleString()}` : "Pending";

  return (
    <div className="border mb-6 border-green-main p-4 rounded-md flex flex-col gap-6 bg-white shadow-sm">
      {/* Top Header */}
      <div className="flex items-center gap-2">
        <img src={send} alt="send" className="w-6" />
        <p className="font-bold text-lg text-green-main">Transfer Details</p>
      </div>

      {/* Vehicle & Price */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <p className="font-semibold text-gray-800">Ride Type</p>
          <div className="flex items-center text-[#393E46] text-sm gap-1.5">
            <p>{vehicle || "Car Type"}</p>
            <img src={car_icon} alt="car" className="w-4" />
          </div>
        </div>

        <div className="text-left sm:text-right">
          <p className="font-bold text-gray-800 text-lg">{displayPrice()}</p>
          <p className="text-xs text-gray-500">Total Amount</p>
        </div>
      </div>

      {/* Bank Transfer Info */}
      <div className="border-t border-gray-200 pt-4 text-sm sm:text-base">
        <p className="font-semibold text-gray-800 mb-1">Make Payment To:</p>
        <div className="bg-gray-50 p-3 rounded-md border border-dashed border-green-main">
          <p>
            <span className="font-semibold text-gray-900">Account Name:</span>{" "}
            U-FLEX SHUTTLE SERVICES
          </p>

          {hasValidPrice ? (
            <>
              <p>
                <span className="font-semibold text-gray-900">Account No:</span>{" "}
                <span className="text-green-main font-bold">
                  {accountNumber || "1013288276"}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-900">Bank Name:</span>{" "}
                KEYSTONE Bank
              </p>
            </>
          ) : (
            <p className="text-gray-500 italic mt-1">
              Waiting for admin to confirm your total amount...
            </p>
          )}
        </div>

        <p className="text-[13px] text-gray-500 mt-2">
          Please confirm the exact amount before transferring.
        </p>
      </div>
    </div>
  );
};

export default PaymentCard;
