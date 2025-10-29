import React from "react";
import { homeimg } from "../assets";

interface LandingProps {
  onGetStarted: () => void;
}

const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  return (
    <section className="bg-green-secondary py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12 gap-8">
        
        {/* Left: Text + Button */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-bold text-[#F1FCE6] leading-snug">
            Get fast and trusted rides near you.
          </h3>
          <p className="text-sm md:text-lg text-[#F1FCE6] mt-4 max-w-md">
            With easy booking, friendly drivers, and smooth rides, every trip is
            made simply for you.
          </p>

          <button
            onClick={onGetStarted}
            className="bg-green-main text-white font-medium rounded-lg px-6 py-3 mt-6 hover:bg-green-700 transition"
          >
            Get Started
          </button>
        </div>

        {/* Right: Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={homeimg}
            alt="U-Flex Shuttle"
            className="w-full max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Landing;
