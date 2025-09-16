import React from "react";

const NewsLetter = () => {
  return (
    <section className="bg-[#F5F5F5] py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-green-main">
          Subscribe to our updates
        </h2>
        <p className="text-green-main mb-6 mt-3 text-sm md:text-base">
          Stay ahead with updates on our latest developments, new features, and
          best deals.
        </p>

        {/* Input + Button */}
        <div className="border border-green-main rounded-full flex py-2  justify-center px-2 items-center w-full">

          <form className="flex w-full   sm:flex-row items-center ">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-2 py-3 placeholder:text-sm text-sm rounded-lg outline-none  border-gray-300 focus:border-green-main"
            />
            <button
              type="submit"
              className="bg-green-main text-white px-4 text-sm  py-3 rounded-full font-medium hover:bg-green-700 transition"
            >
            Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
