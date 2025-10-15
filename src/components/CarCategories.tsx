import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  camry, corrola, lexus, LexusJeep, nissan, pado, rangerover, sienna } from "../assets";
import { useNavigate } from "react-router-dom";

interface Category {
    id: number;
    name: string;
    cars: {
        name: string;
        image: string;
    }[];
}

const CarCategories: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);

    const navigate = useNavigate()

    const categories: Category[] = [
        {
            id: 1,
            name: "Budget-Friendly",
            cars: [
                { name: "Toyota Sienna", image: sienna },
                { name: "Toyota Camry", image: camry },
                { name: "Toyota Corollla", image:corrola },
            ],
        },
        {
            id: 2,
            name: "Premium",
            cars: [
                { name: "Nissan Pathfider", image: nissan },
                { name: "Lexus Es330 car", image: lexus },
                // { name: "", image: c6 },
            ],
        },
        {
            id: 3,
            name: "VIP Luxury ",
            cars: [
                { name: "Range Rover Jeep", image: rangerover },
                { name: "Lexus Rs350 Jeep", image: LexusJeep },
                { name: "Range Rover Pado", image: pado },
            ],
        },
    ];

    const toggleCategory = (id: number) => {
        setActiveCategory(activeCategory === id ? null : id);
    };

    // 👇 Automatically open the first category on mount
    useEffect(() => {
        setActiveCategory(categories[0].id);
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-green-main">
                Ride in Style
            </h2>

            <p className="text-center text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
                At Uflex Shuttle Service, we know that time, safety, and comfort matter most when you travel for business.
                Our tailored cars ensure every trip is smooth — from airport arrivals to boardroom meetings.
            </p>

            <div className="space-y-5">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden"
                    >
                        {/* Category Header */}
                        <button
                            onClick={() => toggleCategory(cat.id)}
                            className="w-full flex justify-between items-center p-5 text-lg font-semibold hover:bg-gray-50 transition"
                        >
                            <span>{cat.name}</span>
                            <span className="text-gray-500">
                                {activeCategory === cat.id ? "▲" : "▼"}
                            </span>
                        </button>

                        {/* Animated Car List */}
                        <AnimatePresence>
                            {activeCategory === cat.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-gray-50 px-5 py-6 border-t border-gray-200"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                        {cat.cars.map((car, index) => (
                                            <div
                                                key={index}
                                                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition p-4 flex flex-col"
                                            >
                                                <img
                                                    src={car.image}
                                                    alt={car.name}
                                                    className="w-full h-40 object-cover rounded-md mb-4"
                                                />

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{car.name}</p>
                                                        <p className="text-sm text-gray-500 italic">
                                                            Category:{" "}
                                                            <span className="text-green-main font-semibold">
                                                                {cat.name}
                                                            </span>
                                                        </p>
                                                    </div>

                                                    <button onClick={() => navigate('/booking')} className="bg-green-main text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition whitespace-nowrap">
                                                        Book Now
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarCategories;
