import { useState } from "react";
import { login, logo, user, whatsapp } from "../assets";
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

    const navigate = useNavigate()
    const handleDropdownToggle = () => setIsLoginOpen((prev) => !prev);
    const handleLoginClick = () => {
        setIsLoginOpen(false); // close dropdown
        setOpenLoginModal(true); // open modal
    };


    const navLinks = [
        { label: "Home", path: "/" },
        { label: "Service", path: "/projects" },
        { label: "About", path: "/about" },
        { label: "Blog", path: "/blog" },
        { label: "Contact Us", path: "/contact" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-between p-4 bg-white shadow-md relative"
        >
            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-2"
            >
                <img src={logo} alt="Logo" className="h-8 w-auto" />
            </motion.div>

            {/* Desktop Links */}
            <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="hidden md:flex gap-6 text-gray-700 font-medium"
            >
                {navLinks.map((link) => (
                    <motion.li key={link.label} variants={itemVariants}>
                        <Link
                            to={link.path}
                            className="px-2 py-1 rounded-md transition hover:text-green-main"
                        >
                            {link.label}
                        </Link>
                    </motion.li>
                ))}
                <motion.li variants={itemVariants}>
                    <button
                        onClick={() => {
                            navigate('/booking');
                            setIsOpen(false); // close mobile menu after navigation
                        }}
                        className="bg-green-main text-black w-full py-2 rounded-lg transition hover:opacity-90"
                    >
                        Get Started
                    </button>
                </motion.li>

            </motion.ul>

            {/* Icons */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-3 relative"
            >
                {/* Dropdown Trigger */}
                <div onClick={handleDropdownToggle} className="flex items-center cursor-pointer">
                    <img src={user} alt="User" className="h-6 w-6" />
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
                            className="absolute top-10 flex flex-col justify-center items-center right-0 bg-white shadow-md rounded-lg p-2 py-4 w-28 z-50"
                        >
                            <p className="text-gray-700 text-sm mb-2">Hello</p>
                            <button
                                onClick={handleLoginClick}
                                className="flex items-center gap-1 text-green-main font-semibold hover:underline"
                            >
                                <img src={login} alt="login" className="w-15" />

                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden font-extralight opacity-45 text-2xl"
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
                        className="absolute h-[95vh] top-16 left-0 w-full bg-white shadow-md p-6 z-40 md:hidden"
                    >

                        <motion.ul
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="flex flex-col w-full gap-4 text-gray-700 font-medium"
                        >
                            {navLinks.map((link) => (
                                <motion.li key={link.label} variants={itemVariants}>
                                    <Link
                                        to={link.path}
                                        className="px-2 py-1 rounded-md transition hover:text-green-main"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                            <motion.li variants={itemVariants}>
                                <button
                                    onClick={() => {
                                        navigate('/booking');
                                        setIsOpen(false); // close mobile menu
                                    }}
                                    className="bg-green-main text-black w-full py-2 rounded-lg transition hover:opacity-90">
                                    Get Started
                                </button>
                            </motion.li>
                        </motion.ul>

                        <motion.img
                            src={whatsapp}
                            alt="WhatsApp"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="absolute right-8 bottom-20 cursor-pointer"
                        />
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Modal Wrapper (controlled by state) */}
            <AnimatePresence>
                {openLoginModal && (
                    <ModalWrapper isOpen onClose={() => setOpenLoginModal(false)}>
                        <Signup />
                    </ModalWrapper>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
