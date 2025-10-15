import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { b1, b2, b3 } from "../assets";

const blogs = [
  {
    id: 1,
    date: "August 25, 2025",
    title: "5 Reasons to Book an Airport Shuttle in Nigeria",
    image: b1,
    summary:
      "Traveling can be stressful, especially when you’re coming from abroad. After a long flight, the last thing you want is to worry about finding safe and reliable transport from the airport.",
    details:
      "Booking a shuttle ensures a safe, comfortable, and hassle-free ride. You can pre-book, choose your preferred vehicle, and enjoy real-time updates. Shuttle services also help save money compared to taxis and provide professional drivers familiar with local traffic patterns.",
  },
  {
    id: 2,
    date: "August 18, 2025",
    title: "How Shuttle Booking Simplifies City Travel",
    image: b2,
    summary:
      "Navigating a busy city can be tough, but shuttle services make it simple and convenient.",
    details:
      "With easy online booking, you can schedule rides at your preferred times. Shuttles are comfortable, reliable, and trackable. They provide a stress-free way to move around the city without worrying about traffic or parking.",
  },
  {
    id: 3,
    date: "August 10, 2025",
    title: "Top Tips for Safe Shuttle Travel",
    image: b3,
    summary:
      "Safety is a priority when booking a shuttle. Here’s what you should keep in mind.",
    details:
      "Check driver reviews, ensure the shuttle company is licensed, and confirm your booking before departure. Using a trusted shuttle service guarantees not just safety, but also comfort and reliability throughout your journey.",
  },
];

const Blog: React.FC = () => {
  const [openBlog, setOpenBlog] = useState<number | null>(null);

  const toggleBlog = (id: number) => {
    setOpenBlog(openBlog === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="px-4 md:px-8 lg:px-10 py-10 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-2 text-gray-900">
          Read Our Stories
        </h1>
        <p className="text-center text-gray-600 mb-10 text-sm sm:text-base">
          Insights, tips, and stories from our travel blog.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 sm:h-56 md:h-48 object-cover rounded-t-xl"
              />

              <div className="p-5 flex flex-col flex-grow">
                <p className="text-gray-400 text-xs sm:text-sm mb-1">
                  {blog.date}
                </p>
                <h2 className="text-[#4FA000] font-semibold text-base sm:text-lg mb-2 cursor-pointer leading-tight">
                  {blog.title}
                </h2>

                <p className="text-[#777E90] text-sm sm:text-base mb-2">
                  {blog.summary}
                </p>

                <button
                  onClick={() => toggleBlog(blog.id)}
                  className="text-blue-600 text-sm sm:text-base font-medium hover:underline self-start mb-2"
                >
                  {openBlog === blog.id ? "Read Less" : "Read More"}
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${openBlog === blog.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <p className="mt-2 text-[#777E90] text-sm sm:text-base mb-4">
                    {blog.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
