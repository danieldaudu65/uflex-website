import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { once, times } from "../assets";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleForm = () => setIsLogin((prev) => !prev);

    // Slide in/out variants
    const sideVariants = {
        hidden: { opacity: 0, x: 50 },
        show: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <motion.div
            layout
            className="w-full relative max-w-sm p bg-white m-auto shadow-md rounded-xl p-6 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            {/* close button */}
            <img src={times} alt="" className="absolute right-4 top-3 cursor-pointer" />
            {/* logo */}
            <img src={once} alt="" className="mt-6 w-full" />

            <h2 className="text-2xl mt-6 px-12 font-extrabold mb-4 text-center">
                {isLogin ? "Log in to book your ride" : "Create your UFlex Shuttle account"}
            </h2>

            <p className="mt-4 text-sm mb-4 text-center">
                {isLogin ? "Don’t have an account? Create one" : "Already have an account?"}{" "}
                <span
                    onClick={toggleForm}
                    className="text-green-main font-semibold cursor-pointer hover:underline"
                >
                    {isLogin ? "Here" : "Login"}
                </span>
            </p>

            {/* Animate height wrapper */}
            <motion.div
                layout
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col gap-3 relative"
            >
                <AnimatePresence mode="wait">
                    {!isLogin && (
                        <>
                            {/* First Name */}
                            <motion.div
                                key="firstName"
                                className="flex flex-col text-sm"
                                variants={sideVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                transition={{ duration: 0.4 }}
                            >
                                <label className="font-medium mb-1">First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
                                />
                            </motion.div>

                            {/* Last Name */}
                            <motion.div
                                key="lastName"
                                className="flex flex-col text-sm"
                                variants={sideVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                transition={{ duration: 0.4, delay: 0.05 }}
                            >
                                <label className="font-medium mb-1">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
                                />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Email */}
                <motion.div
                    key="email"
                    className="flex flex-col text-sm"
                    variants={sideVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                >
                    <label className="font-medium mb-1">Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
                    />
                </motion.div>

                <AnimatePresence mode="wait">
                    {!isLogin && (
                        <>
                            {/* First Name */}
                            <motion.div
                                key="number"
                                className="flex flex-col text-sm"
                                variants={sideVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                transition={{ duration: 0.4 }}
                            >
                                <label className="font-medium mb-1">Phone number</label>
                                <input
                                    type="number"
                                    placeholder="Type your phone number name"
                                    className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
                                />
                            </motion.div>


                        </>
                    )}
                </AnimatePresence>

                {/* Password */}
                <motion.div
                    key="password"
                    className="flex flex-col text-sm relative"
                    variants={sideVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                >
                    <label className="font-medium mb-1">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md pr-10"
                    />
                    <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute   right-3 top-9 text-gray-500 cursor-pointer"
                    >
                        {showPassword ? <p className="text-green-main font-bold">SHOW</p> : <p className="text-green-main font-bold">HIDE</p>}
                    </span>
                </motion.div>

                {isLogin && <p className="text-green-main text-xs mb-4 mt-1">Forgot your password ?</p>}

                {/* <AnimatePresence mode="wait">
          {!isLogin && (
            <motion.div
              key="confirmPassword"
              className="flex flex-col text-sm relative"
              variants={sideVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <label className="font-medium mb-1">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="border border-gray-200 p-2 rounded-md pr-10"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-9 text-gray-500 cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </motion.div>
          )}
        </AnimatePresence> */}

                {/* Button */}
                <motion.button
                    layout
                    type="submit"
                    className="bg-green-main text-black font-bold py-2 rounded-md mt-2 hover:opacity-90 transition"
                >
                    {isLogin ? "Log in" : "Submit"}
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default Signup;
