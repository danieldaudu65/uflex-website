import React from "react";
import Navbar from "../components/Navbar";
import { aboutBg, button } from "../assets";
import { vision_mission } from "../data/About";
import Footer from "../components/Footer";
import PremiumServices from "../components/PremiumServices";
import PremuimServiceTrave from "../components/PremuimServiceTrave";

const About: React.FC = () => {
  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full">
        <img
          src={aboutBg}
          alt="About background"
          className="w-full h-[250px] md:h-[450px] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold drop-shadow-lg text-center px-4">
            About Us
          </h1>
        </div>
      </div>

      {/* Intro Section */}
      <div className="max-w-6xl mx-auto text-center p-4 md:p-12">
        <h2 className="text-2xl md:text-4xl font-[900] leading-snug md:leading-tight p-4 md:p-6">
          Giving safe and comfortable rides for people coming into Nigeria
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
          Our drivers are trained, our cars are top quality, and we make sure you feel welcome and safe from the very first moment you arrive.
        </p>
        <img
          className="flex justify-center m-auto my-4 md:my-12 w-48 md:w-62"
          src={button}
          alt=""
        />
      </div>

      {/* Vision & Mission Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-12 py-10 md:py-20">
        <div className="grid gap-10 md:gap-20">
          {vision_mission.map((int, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row ${
                idx === 1 ? "md:flex-row-reverse" : ""
              } items-center gap-6 md:gap-12`}
            >
              {/* Text Section */}
              <div className="md:w-1/2">
                <h2
                  dangerouslySetInnerHTML={{ __html: int.topic }}
                  className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4"
                />
                <p className="text-[#181A1D] text-sm md:text-base leading-relaxed">
                  {int.text}
                </p>
              </div>

              {/* Image Section */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={int.image}
                  alt=""
                  className="w-full md:w-[420px] lg:w-[500px] object-contain rounded-2xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Service Sections */}
      <PremiumServices />
      <PremuimServiceTrave />

      <Footer />
    </div>
  );
};

export default About;
