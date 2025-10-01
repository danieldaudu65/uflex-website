import React from "react";
import { motion } from "framer-motion";

const offers = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    title: "Fast & Reliable Rides",
    description:
      "Book your ride within seconds and reach your destination safely and on time.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    title: "Friendly Drivers",
    description:
      "Our professional drivers ensure comfort, courtesy, and a smooth experience every time.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=800&q=80",
    title: "Safe & Secure",
    description:
      "Your safety is our top priority, with trusted drivers and a reliable booking system.",
  },
];

const Offer:React.FC = () => {
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
