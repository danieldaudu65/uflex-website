import React, { useState } from "react";

interface PolicyModalProps {
  onAgree: () => void;
  onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ onAgree, onClose }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-semibold text-center mb-3">
          Refund and Cancellation Policy
        </h2>

        <div className="text-sm text-gray-700 space-y-2 max-h-[200px] overflow-y-auto border p-3 rounded-lg">
          <p>• Refund and cancellation requests are valid only within 72 hours of booking.</p>
          <p>• Cancellations made after the 72-hour window are not eligible for a refund.</p>
          <p>• Clients who cancel within the validity period may reschedule their trip(s) within two (2) weeks from the date of cancellation.</p>
          <p>• Clients who fail to reschedule within these two weeks will incur a 25% administrative fee, which will be deducted from the initial payment. The remaining balance will then be refunded to the client.</p>
        </div>

        <div className="flex items-center mt-4">
          <input
            id="agree"
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="mr-2 w-4 h-4 accent-green-600"
          />
          <label htmlFor="agree" className="text-sm text-gray-700">
            I agree to the Refund and Cancellation Policy
          </label>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            disabled={!agreed}
            onClick={onAgree}
            className={`px-4 py-2 rounded-full text-white ${
              agreed ? "bg-green-600 hover:bg-green-700" : "bg-green-300"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
