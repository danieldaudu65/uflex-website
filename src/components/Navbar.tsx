import { useEffect, useState } from "react";
import { login, logo, serv1, serv2, serv3, user, whatsapp } from "../assets";
import { FaTimes } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ModalWrapper from "./modalParent";
import Signup from "./Signup";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [userData, setUserData] = useState<{ firstName?: string; lastName?: string } | null>(null);

  const [isServiceOpenDesktop, setIsServiceOpenDesktop] = useState(false);
  const [isServiceOpenMobile, setIsServiceOpenMobile] = useState(false);

  const navigate = useNavigate();

  const handleDropdownToggle = () => setIsLoginOpen((prev) => !prev);
  const handleLoginClick = () => {
    setIsLoginOpen(false);
    setOpenLoginModal(true);
  };

  // const handleServiceToggle = () => setIsServiceOpen((prev) => !prev);


  const serviceSubmenu = [
    { image: serv1, heading: "Airport Rides", desc: "We pick you up from the airport or drop you off on time, with friendly, trained drivers." },
    { image: serv2, heading: "Safe Travel with Escorts", desc: "Need extra safety? We can provide police or security escorts for your trip." },
    { image: serv3, heading: "Car Rentals", desc: "Choose from our clean and comfy cars, like Range Rover, Pathfinder, Sienna Minivan, or Toyota Camry." },

  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user from localStorage", err);
      }
    }
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Service", path: "/projects" },
    { label: "About", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Contact Us", path: "/contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const panel = document.getElementById("service-panel");
      if (panel && !panel.contains(e.target as Node)) {
        setIsServiceOpenDesktop(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 },
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear stored user
    setUserData(null);               // reset state
    setIsLoginOpen(false);           // close dropdown
    navigate("/");                   // optional: redirect to home
  };


  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-between p-4 lg:px-24 bg-white shadow-md relative z-50"
    >
      {/* Logo */}
      <motion.div

        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Logo" className="h-8 lg:h-12 w-auto" />
      </motion.div>

      {/* Desktop Links */}
      <motion.ul
        id="service-panel"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="hidden md:flex gap-6 text-gray-700 font-medium items-center"
      >
        {navLinks.map((link) => (
          <motion.li key={link.label} variants={itemVariants} className="relative">
            {link.label === "Service" ? (
              <div
                className="flex items-center gap-1 cursor-pointer px-2 py-1 rounded-md hover:text-green-main"
                onClick={() => setIsServiceOpenDesktop((prev) => !prev)}
              >
                {link.label}
                <MdOutlineKeyboardArrowDown
                  className={`transition-transform ${isServiceOpenDesktop ? "rotate-180" : ""}`}
                />
              </div>
            ) : (
              <Link
                to={link.path}
                className="px-2 py-1 rounded-md transition hover:text-green-main"
              >
                {link.label}
              </Link>
            )}
          </motion.li>
        ))}


        <motion.li variants={itemVariants}>
          <button
            onClick={() => navigate("/booking")}
            className="bg-green-main text-black px-4 py-2 rounded-lg font-semibold transition hover:opacity-90"
          >
            Get Started
          </button>
        </motion.li>
      </motion.ul>

      <AnimatePresence>
        {isServiceOpenDesktop && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-full w-full bg-white shadow-lg border-t border-gray-100 py-8 z-40"
          >
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
              {serviceSubmenu.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center bg-gray-50 rounded-2xl p-6 hover:bg-green-50 transition"
                >
                  <img src={item.image} alt={item.heading} className="h-24 w-24 object-contain mb-4" />
                  <h3 className="text-lg font-bold text-green-main mb-2">{item.heading}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Right Icons */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center gap-3 relative"
      >
        {/* User Dropdown Trigger */}
        <div
          onClick={handleDropdownToggle}
          className="flex items-center gap-1 cursor-pointer hover:opacity-80"
        >
          {userData ? (
            <div className="flex items-center justify-center h-8 w-8 bg-green-main text-white font-bold rounded-full">
              {`${userData.firstName?.[0] || ""}${userData.lastName?.[0] || ""}`.toUpperCase()}
            </div>
          ) : (
            <img src={user} alt="User" className="h-6 w-6" />
          )}
          <MdOutlineKeyboardArrowDown />
        </div>


        {/* Dropdown */}
        <AnimatePresence>
          {isLoginOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-4 w-24 lg:w-36 z-50 border border-gray-100"
            >
              {userData ? (
                <div className="flex flex-col text-center text-sm text-gray-700">
                  <p>Hello,</p>
                  <p className="font-bold text-green-main">
                    {userData.firstName || "User"}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 font-extrabold hover:opacity-80"
                  >
                    Log Out
                  </button>                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-gray-700 text-sm">Hello</p>
                  <button
                    onClick={handleLoginClick}
                    className="flex items-center gap-2 text-green-main font-semibold hover:underline"
                  >
                    <img src={login} alt="login" className="w-16" />

                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBarsStaggered />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute h-[95vh] top-16 left-0 w-full bg-white shadow-lg p-6 z-40 md:hidden flex flex-col justify-between"
          >
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col w-full gap-4 text-gray-700 font-medium"
            >
              {navLinks.map((link) => (
                <motion.li key={link.label} variants={itemVariants} className="relative">
                  {link.label === "Service" ? (
                    <>
                      <div
                        className="flex items-center justify-between cursor-pointer px-2 py-2 rounded-md hover:text-green-main"
                        onClick={() => setIsServiceOpenMobile((prev) => !prev)}
                      >
                        {link.label}
                        <MdOutlineKeyboardArrowDown
                          className={`transition-transform ${isServiceOpenMobile ? "rotate-180" : ""}`}
                        />
                      </div>

                      {/* ✅ Slide-down submenu inside mobile */}
                      <AnimatePresence>
                        {isServiceOpenMobile && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pl-6 flex bg-[#F1FCE6] flex-col gap-3 mt-2"
                          >
                            {serviceSubmenu.map((item, index) => (
                              <li
                                key={index}
                                className="flex gap-3 bg-gray-50 p-3 rounded-lg hover:bg-green-50  transition"
                              >
                                <img src={item.image} className="w-6 self-start" alt="" />
                                <div>

                                  <p className="font-semibold text-black/60 mb">{item.heading}</p>
                                  <p className="text-xs text-black/50 font-light text-gray-600">{item.desc}</p>
                                </div>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className="px-2 py-1 rounded-md transition hover:text-green-main"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              ))}



              <motion.li variants={itemVariants}>
                <button
                  onClick={() => {
                    navigate("/booking");
                    setIsOpen(false);
                  }}
                  className="bg-green-main text-black w-full py-2 rounded-lg font-semibold transition hover:opacity-90"
                >
                  Get Started
                </button>
              </motion.li>
            </motion.ul>

            <a href="https://wa.me/2348112159041" target="_blank">

              <motion.img
                src={whatsapp}
                alt="WhatsApp"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-34 absolute right-8 bottom-40 cursor-pointer hover:scale-110 transition-transform"
              />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signup Modal */}
      <AnimatePresence>
        {openLoginModal && (
          <ModalWrapper isOpen onClose={() => setOpenLoginModal(false)}>
            <Signup onClose={() => setOpenLoginModal(false)} />
          </ModalWrapper>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
