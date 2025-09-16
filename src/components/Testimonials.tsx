import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Dami",
    initials: "DA",
    rating: 4,
    text: "Booking a ride has never been this easy. The app is fast, the drivers are friendly, and I always feel safe.",
    date: "Jan 11, 2025",
  },
  {
    name: "Ada",
    initials: "AD",
    rating: 5,
    text: "Great service! Always reliable and super affordable. Highly recommend.",
    date: "Feb 2, 2025",
  },
  {
    name: "John",
    initials: "JO",
    rating: 5,
    text: "Smooth booking process and amazing drivers. I’ve been using this app daily.",
    date: "Mar 5, 2025",
  },
];



const Testimonials: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className="py-22 px-6">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-green-900 mb-8">
        We know testimonials drive trust —
        <br />
        here’s why people trust us
      </h2>

      <Slider {...settings} className="max-w-xl mx-auto">
        {testimonials.map((t, index) => (
          <div key={index} className="p-6 border  border-gray-300  bg-white rounded-xl shadow-md">
            {/* Avatar */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full font-bold text-green-700">
                {t.initials}
              </div>
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-gray-500">{t.date}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${i < t.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Testimonial text */}
            <p className="text-gray-700 text-sm">{t.text}</p>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Testimonials;
