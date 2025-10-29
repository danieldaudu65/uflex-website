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
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 850, // 👈 iPhone 12 width after DPR scaling
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // extra safety
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <section className="py-16 px-4 sm:px-6 lg:px-10 bg-gray-50">
      <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-green-main mb-10 leading-snug">
        We know testimonials drive trust —
        <br className="hidden sm:block" />
        here’s why people trust us
      </h2>

      <div className="max-w-5xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((t, index) => (
            <div key={index} className="px-3">
              <div className="p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-md h-full flex flex-col justify-between">
                {/* Avatar + Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full font-bold text-green-700 text-lg">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
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
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {t.text}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
