import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/Navbar/logo.svg"; // replace with your logo path

const LogoLoader = ({ isLoading }: { isLoading: boolean }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isLoading) {
      setShow(true);

      // keep visible for at least 5 seconds
      timer = setTimeout(() => {
        setShow(false);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Center Logo */}
        <img src={logo} alt="logo" className="w-16 h-16 object-contain z-10" />

        {/* Orbiting Container */}
        <motion.div
          className="absolute w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          {/* 4 Balls in Orbit */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-green-400 rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-green-400 rounded-full" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-green-400 rounded-full" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-green-400 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
};

export default LogoLoader;
