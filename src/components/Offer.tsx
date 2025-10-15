import React from "react";
import { motion } from "framer-motion";
import { wo1, wo2, wo3 } from "../assets";

const offers = [
  {
    id: 1,
    image:
      wo1,
    title: "EXECUTIVE AIRPORT TRANSFERS",
    description:
      "private luxury vehicles with professional punctual drivers.",
  },
  {
    id: 2,
    image:
      wo2,
    title: "HOTEL &MEETING ASSISTANCE",
    description:
      "Concierge services for lodging and business centre needs.",
  },
  {
    id: 3,
    image:
      wo3,
    title: "CONFIDENTIAL & RELIABLE",
    description:
      "We understand the importance of privacy for international executives.",
  },
];

const Offer: React.FC = () => {
  return (
    <div className="py-24 px-6 md:px-12 bg-gray-50">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-green-900 mb-12">
        What We Offer
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition h-[380px] flex flex-col"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-52 object-cover"
              loading="lazy"
            />
            <div className="p-6 text-center flex flex-col flex-grow">
              <h3 className="text-lg md:text-xl font-semibold text-green-800 mb-3">
                {offer.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {offer.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
