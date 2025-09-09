import { useState } from "react";
import { login, logo, user, whatsapp } from "../assets";
import { FaTimes } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navLinks: { label: string; path: string }[] = [
        { label: "Home", path: "/" },
        { label: "Service", path: "/projects" },
        { label: "About", path: "/about" },
        { label: "Blog", path: "/blog" },
        { label: "Contact Us", path: "/contact" },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
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
            className="flex items-center justify-between p-4 bg-white shadow-md"
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

                {/* Button included in animation */}
                <motion.li variants={itemVariants}>
                    <button className="bg-green-main text-white px-4 py-2 rounded-lg transition hover:opacity-90">
                        Get Started
                    </button>
                </motion.li>
            </motion.ul>

            {/* Icons */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-3"
            >
                <div className="flex items-center">
                    <img src={user} alt="User" className="h-6 w-6 cursor-pointer" />
                    <MdOutlineKeyboardArrowDown />
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden font-extralight opacity-45 text-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBarsStaggered />}
                </button>
            </motion.div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute w-full h-full px-8 top-14 right-0 bg-white shadow-lg rounded-lg p-5 md:hidden"
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

                        {/* Button animated too */}
                        <motion.li variants={itemVariants}>
                            <button className="bg-green-main text-black w-full py-2 rounded-lg transition hover:opacity-90">
                                Get Started
                            </button>
                        </motion.li>
                    </motion.ul>

                    <motion.img
                        src={whatsapp}
                        alt="WhatsApp"
                        initial={{ opacity: 0, x: 100 }} // start off-screen right
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="absolute right-8 bottom-20  cursor-pointer"
                    />
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
