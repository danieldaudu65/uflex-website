import React from "react";
// import { arrow_left } from "../../assets";
import { useNavigate } from "react-router-dom";
import { arrow_left } from "../assets";

const PaymentHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
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
  );
};

export default PaymentHeader;
