import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { once, times } from "../assets";
// import { API_URL } from "../utils/api"; // 👈 import API_URL
import toast from "react-hot-toast";
import { API_URL } from "../utils/confiq";
import LogoLoader from "./LogoLoader";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    const toggleForm = () => setIsLogin((prev) => !prev);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const endpoint = isLogin ? "/auth/login" : "/auth/signup";
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    isLogin
                        ? { email: formData.email, password: formData.password }
                        : formData
                ),
            });

            const data = await res.json();

            // Store result in a temp variable (don’t toast yet)
            if (!res.ok) {
                setTimeout(() => toast.error(data.msg || "Something went wrong"), 5000);
                return;
            }

            setTimeout(() => {
                toast.success(data.msg);

                if (isLogin && data.token) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                }

                // wait 500ms before navigating so toast is visible
                setTimeout(() => navigate("/booking"), 500);
            }, 5000);

        } catch (err: any) {
            setTimeout(() => toast.error(err.message), 5000);
        } finally {
            // End loader after 5s
            setTimeout(() => setLoading(false), 5000);
        }
    };

    // Animation
    const sideVariants = {
        hidden: { opacity: 0, x: 50 },
        show: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <div>
            <LogoLoader isLoading={loading} />


            <motion.form
                onSubmit={handleSubmit}
                className="w-full relative max-w-sm bg-white m-auto shadow-md rounded-xl p-6 overflow-hidden"
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

                <motion.div layout transition={{ duration: 0.4 }} className="flex flex-col gap-3 relative">
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
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
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
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
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
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Enter your email"
                            className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
                        />
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {!isLogin && (
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
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="Type your phone number"
                                    className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
                                />
                            </motion.div>
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md pr-10"
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-9 text-green-main font-bold cursor-pointer"
                        >
                            {showPassword ? "HIDE" : "SHOW"}
                        </span>
                    </motion.div>

                    {isLogin && <p className="text-green-main text-xs mb-4 mt-1">Forgot your password?</p>}

                    {/* Button */}
                    <motion.button
                        layout
                        type="submit"
                        disabled={loading}
                        className="bg-green-main text-black font-bold py-2 rounded-md mt-2 hover:opacity-90 transition"
                    >
                        {isLogin ? "Log in" : "Sign up"}
                    </motion.button>
                </motion.div>
            </motion.form>
        </div>
    );
};

export default Signup;
