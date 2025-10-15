import React from "react";

interface Props {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const ConfirmButton: React.FC<Props> = ({ label, onClick, disabled, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-3 rounded-lg font-bold ${
        disabled ? "bg-gray-400 text-white" : "bg-[#65CE00] text-black"
      }`}
    >
      {loading ? "Processing..." : label}
    </button>
  );
};

export default ConfirmButton;
